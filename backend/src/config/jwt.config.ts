export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'dev-secret-change-me',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}
