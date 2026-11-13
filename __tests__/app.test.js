const request = require('supertest')
const app = require('../src/app')
const { register } = require('../src/metrics')

describe('routes', () => {
  test('GET / returns project name', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.text).toBe('DevOps Final Project')
  })

  test('GET /health returns status ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ status: 'ok' })
  })
})

describe('metrics', () => {
  beforeEach(() => register.resetMetrics())

  test('GET /metrics uses prometheus format', async () => {
    const res = await request(app).get('/metrics')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toContain('text/plain')
    expect(res.text).toContain('# TYPE http_requests_total counter')
    expect(res.text).toContain('process_cpu_user_seconds_total')
  })

  test('http_requests_total counts requests by route and status', async () => {
    await request(app).get('/')
    await request(app).get('/')
    await request(app).get('/nope')
    const res = await request(app).get('/metrics')
    expect(res.text).toContain('http_requests_total{method="GET",route="/",status="200"} 2')
    expect(res.text).toContain('http_requests_total{method="GET",route="unknown",status="404"} 1')
  })
})
