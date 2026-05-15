import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { corsConfig } from './config/cors.config'
import { appConfig } from './config/app.config'

const app = new Elysia()
  .use(cors(corsConfig))
  .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))

app.listen(appConfig.port, () => {
  console.log(`🚀 Backend running at http://localhost:${appConfig.port}`)
})
