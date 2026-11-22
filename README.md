# PeTrade Journey

Aplikasi jurnal trading dengan React + Vite dan REST API NestJS. Tugas 10 mengganti penyimpanan array dari Tugas 9 menjadi PostgreSQL menggunakan Prisma ORM, sehingga data tetap tersimpan setelah backend di-restart.

Acuan: Modul 10, halaman tercetak 101-110, **MODUL PENGWEB RPL GANJIL 2026-2027**.

## Menjalankan aplikasi

Prasyarat: Node.js yang mendukung Prisma 7, npm, dan PostgreSQL lokal.

1. Buat database `petrade_journey` melalui pgAdmin.
2. Isi `DATABASE_URL` pada `backend/.env` dengan koneksi PostgreSQL ke database tersebut. Format koneksi: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`. Karakter khusus pada password harus di-URL-encode; `#` menjadi `%23`.
3. Jalankan dari folder proyek:

```powershell
npm.cmd install
npm.cmd --prefix backend install
cd backend
npx.cmd prisma migrate dev --name init
cd ..
npm.cmd run build:api
```

Jalankan backend dan frontend pada dua terminal:

```powershell
npm.cmd run dev:api
```

```powershell
npm.cmd run dev
```

Frontend: http://localhost:5173. REST API: http://localhost:3001/trades. Untuk melihat tabel dan data, jalankan `npm.cmd --prefix backend run db:studio`.

## Pemenuhan Tugas 10

| Ketentuan | Implementasi dan screenshot |
| --- | --- |
| PostgreSQL lokal dan database aplikasi | Database `petrade_journey`; [bukti tabel](docs/screenshots/tugas-10/01-postgresql-tabel.png) |
| Model Prisma sesuai entitas utama | [Model Trade](backend/prisma/schema.prisma) dengan 11 field; [screenshot schema](docs/screenshots/tugas-10/02-schema-prisma.png) |
| Migrasi awal menggunakan `prisma migrate dev` | [Riwayat migrasi SQL](backend/prisma/migrations); [screenshot migrasi](docs/screenshots/tugas-10/03-migrasi-awal.png) |
| PrismaService sebagai provider pengganti array | [PrismaService](backend/src/prisma/prisma.service.ts), [PrismaModule](backend/src/prisma/prisma.module.ts), [TradesService](backend/src/trades/trades.service.ts); [provider](docs/screenshots/tugas-10/04-prisma-provider.png), [service](docs/screenshots/tugas-10/05-crud-prisma.png) |
| Controller tetap dari Tugas 9 | [TradesController](backend/src/trades/trades.controller.ts); [screenshot controller](docs/screenshots/tugas-10/06-controller-tetap.png) |
| CRUD menggunakan Prisma Client | [POST](docs/screenshots/tugas-10/07-post-tambah-trade.png), [GET](docs/screenshots/tugas-10/09-get-detail-trade.png), [PATCH](docs/screenshots/tugas-10/10-patch-ubah-trade.png), [DELETE](docs/screenshots/tugas-10/14-delete-trade.png) |
| Data tetap ada setelah restart backend | [Bukti persistensi](docs/screenshots/tugas-10/07-persistensi-restart.png) |
| Tampilan desktop dan mobile | [Desktop](docs/screenshots/tugas-10/20-trade-berhasil-ditambah.png), [mobile](docs/screenshots/tugas-10/26-tampilan-mobile.png) |

Prisma menggunakan versi **7.10.0** sesuai modul. Penyesuaian untuk versi tersebut: URL koneksi berada di [prisma.config.ts](backend/prisma.config.ts), `.env` dimuat menggunakan dotenv, PostgreSQL memakai adapter, dan client di-generate saat `build:api`. Referensi: [panduan resmi Prisma 7](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7).

## Endpoint

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| GET | /trades | Daftar trade |
| GET | /trades/:id | Detail trade |
| POST | /trades | Tambah trade |
| PATCH | /trades/:id | Ubah trade |
| DELETE | /trades/:id | Hapus trade, respons 204 |

Untuk memeriksa penyimpanan permanen, tambahkan trade melalui aplikasi, hentikan backend, jalankan kembali, lalu muat ulang frontend. Data trade tetap tersedia. Ubah dan hapus trade melalui tombol pada riwayat trading.

Screenshot tersimpan di [docs/screenshots/tugas-10](docs/screenshots/tugas-10). File `backend/.env` berisi koneksi lokal dan diabaikan oleh Git. Pengelolaan Git/GitHub serta pengumpulan tautan repository ke LMS dilakukan oleh pemilik proyek.
