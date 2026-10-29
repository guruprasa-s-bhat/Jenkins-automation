import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const services = [
  { name: 'api-service', status: 'healthy' },
  { name: 'user-service', status: 'healthy' },
  { name: 'order-service', status: 'healthy' }
]

app.get('/', (_req, res) => {
  res.json({
    message: 'DevFlow API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/services']
  })
})

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'node-api',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/services', (_req, res) => {
  res.json({ services })
})

app.listen(PORT, () => {
  console.log(`DevFlow API listening on port ${PORT}`)
})