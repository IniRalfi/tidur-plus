import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@perpustakaan.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'superadmin@perpustakaan.com',
      role: Role.super_admin,
    },
  })
  console.log('Super Admin seeded:', superAdmin.email)

  // Seed default Konfigurasi
  const configs = [
    { key: 'tarif_denda_per_hari', value: '1000' },
    { key: 'durasi_pinjam_default', value: '14' },
    { key: 'maks_buku_per_anggota', value: '2' },
    { key: 'maks_perpanjangan', value: '2' },
  ]
  for (const config of configs) {
    await prisma.konfigurasi.upsert({
      where: { key: config.key },
      update: {},
      create: { ...config, updatedBy: superAdmin.id },
    })
  }
  console.log('Konfigurasi default seeded')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
