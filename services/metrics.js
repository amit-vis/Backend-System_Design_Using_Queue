const Prometheus = require("prom-client");

module.exports.metricsService = async (req, res) => {  // Corrected 'mtricsService' to 'metricsService'
  res.set("Content-Type", Prometheus.register.contentType);
  res.end(await Prometheus.register.metrics());
};
