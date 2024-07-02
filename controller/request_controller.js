const Request = require("../model/request");
const queueService = require("../services/queueService");

module.exports.enqueueRequest = async (req, res, next) => {
  try {
    const qname = `queue_${req.user._id}`;
    const { requestData } = req.body;
    console.log(requestData);

    const requestLog = await Request.create({
      userId: req.user._id,
      requestData: requestData,
      status: 'queued'
    });

    await queueService.createQueue(qname);
    await queueService.sendToQueue(qname, JSON.stringify({ requestId: requestLog._id, requestData: requestData }));

    console.log('Request Enqueued:', requestData, requestLog);

    return res.status(200).json({
        message: "Request Enqueued!",
        requestId: requestLog._id  // Add requestId to the response JSON
      });
  } catch (error) {
    console.error('Enqueue Request Error:', error);
    next(error);
  }
};
