# PeTrade Journey API

REST API NestJS untuk Tugas 10 dengan PostgreSQL dan Prisma ORM 7.10.0. Entitas utama: Trade. Database: `petrade_journey`.

Isi `DATABASE_URL` pada `backend/.env`, lalu jalankan dari folder backend:

```powershell
npm.cmd install
npx.cmd prisma migrate dev --name init
npm.cmd run build
npm.cmd run start:dev
```

API berjalan pada http://localhost:3001/trades. Controller, DTO, dan CORS tetap dari Tugas 9; penyimpanan array diganti PrismaService. Panduan dan screenshot tersedia di [README utama](../README.md).
