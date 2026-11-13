const client = require('prom-client')

const register = new client.Registry()
client.collectDefaultMetrics({ register })

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
})

function countRequests(req, res, next) {
  res.on('finish', () => {
    const route = req.route ? req.route.path : 'unknown'
    httpRequestsTotal.inc({ method: req.method, route, status: res.statusCode })
  })
  next()
}

module.exports = { register, httpRequestsTotal, countRequests }
