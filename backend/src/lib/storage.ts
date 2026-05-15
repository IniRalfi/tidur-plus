import path from 'path'
import fs from 'fs/promises'

export const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads'

export async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
}

export function getFileUrl(filename: string): string {
  return `/uploads/${filename}`
}
