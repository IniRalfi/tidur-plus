import { appConfig } from './app.config'

export const corsConfig = {
  origin: appConfig.frontendUrl,
  credentials: true,
}
