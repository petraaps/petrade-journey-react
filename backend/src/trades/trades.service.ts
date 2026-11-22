import {
  BadRequestException, ConflictException, Injectable, NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import type { Trade as StoredTrade } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';

@Injectable()
export class TradesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTradeDto): Promise<Trade> {
    this.validateResult(dto);
    this.validateDecimals(dto);
    const trade = await this.prisma.trade.create({
      data: {
        ...dto,
        tanggal: new Date(dto.tanggal),
        hasil: dto.hasil === 'Break Even' ? 'BreakEven' : dto.hasil,
        catatan: dto.catatan?.trim() ?? '',
        sesuaiRencana: dto.sesuaiRencana ?? false,
      },
    });
    return this.toEntity(trade);
  }

  async findAll(): Promise<Trade[]> {
    const trades = await this.prisma.trade.findMany({
      orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }, { id: 'asc' }],
    });
    return trades.map((trade) => this.toEntity(trade));
  }

  async findOne(id: string): Promise<Trade> {
    const trade = await this.prisma.trade.findUnique({ where: { id } });
    if (!trade) throw this.notFound(id);
    return this.toEntity(trade);
  }

  async update(id: string, dto: UpdateTradeDto): Promise<Trade> {
    // Serializable menjaga validasi hasil/P&L saat dua PATCH masuk bersamaan.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await this.prisma.$transaction(async (tx) => {
          const current = await tx.trade.findUnique({ where: { id } });
          if (!current) throw this.notFound(id);
          if (Object.keys(dto).length === 0) {
            throw new BadRequestException('Kirim minimal satu field untuk mengubah trade.');
          }
          this.validateResult({ ...this.toEntity(current), ...dto });
          this.validateDecimals(dto);
          const updated = await tx.trade.update({
            where: { id },
            data: {
              ...dto,
              tanggal: dto.tanggal === undefined ? undefined : new Date(dto.tanggal),
              hasil: dto.hasil === 'Break Even' ? 'BreakEven' : dto.hasil,
              catatan: dto.catatan === undefined ? undefined : dto.catatan?.trim() ?? '',
            },
          });
          return this.toEntity(updated);
        }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') throw this.notFound(id);
          if (error.code === 'P2034') {
            if (attempt < 2) continue;
            throw new ConflictException('Trade diubah bersamaan. Silakan ulangi perubahan.');
          }
        }
        throw error;
      }
    }
    throw new ConflictException('Silakan ulangi perubahan trade.');
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.trade.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw this.notFound(id);
      }
      throw error;
    }
  }

  private toEntity(trade: StoredTrade): Trade {
    return {
      ...trade,
      tanggal: trade.tanggal.toISOString().slice(0, 10),
      hasil: trade.hasil === 'BreakEven' ? 'Break Even' : trade.hasil,
      lotSize: trade.lotSize.toNumber(),
      profitLoss: trade.profitLoss.toNumber(),
      createdAt: trade.createdAt.toISOString(),
      updatedAt: trade.updatedAt.toISOString(),
    };
  }

  private notFound(id: string): NotFoundException {
    return new NotFoundException(`Trade dengan id ${id} tidak ditemukan.`);
  }

  private validateDecimals(dto: Pick<UpdateTradeDto, 'lotSize' | 'profitLoss'>): void {
    // API tetap memakai JSON number, batasi nominal agar konversi Decimal aman.
    for (const value of [dto.lotSize, dto.profitLoss]) {
      if (value !== undefined && Math.abs(value) > 999999999999.99) {
        throw new BadRequestException('Lot size dan profit/loss maksimal 999999999999.99.');
      }
    }
  }

  private validateResult(trade: Pick<Trade, 'hasil' | 'profitLoss'>): void {
    const valid =
      (trade.hasil === 'Win' && trade.profitLoss > 0) ||
      (trade.hasil === 'Loss' && trade.profitLoss < 0) ||
      (trade.hasil === 'Break Even' && trade.profitLoss === 0);
    if (!valid) {
      throw new BadRequestException(
        'Win harus memiliki profit positif, Loss negatif, dan Break Even bernilai 0.',
      );
    }
  }
}
