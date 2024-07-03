const Prometheus = require("prom-client");

// function for metrics services
module.exports.metricsService = async (req, res) => {  
  res.set("Content-Type", Prometheus.register.contentType);
  res.end(await Prometheus.register.metrics());
};
