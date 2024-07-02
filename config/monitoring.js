const Prometheus = require("prom-client");

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: "http_request_duration_ms",  // Corrected 'http_request_duretion_ms' to 'http_request_duration_ms'
  help: "Duration of HTTP requests in ms",
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000]
});

const monitoringMiddleware = (req, res, next) => {  // Corrected 'moniteringMiddleware' to 'monitoringMiddleware'
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.path, code: res.statusCode });  // Corrected 'req.statuscode' to 'res.statusCode'
  });
  next();
};

module.exports = monitoringMiddleware;  // Corrected 'moniteringMiddleware' to 'monitoringMiddleware'
