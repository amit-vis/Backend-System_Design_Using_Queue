const queueService = require("./queueService");
const Request = require("../model/request");

const processRequest = async (message) => {
  try {
    const { requestId, requestData } = JSON.parse(message);
    console.log('Processing request:', requestId, requestData);

    await Request.findByIdAndUpdate(requestId, { status: 'processing' });

    // Simulate request processing
    await new Promise(resolve => setTimeout(resolve, 10000));

    console.log('Request processed:', requestId);

    await Request.findByIdAndUpdate(requestId, { status: 'completed' });
  } catch (error) {
    console.error('Processing error:', error);
    const { requestId } = JSON.parse(message);
    await Request.findByIdAndUpdate(requestId, { status: 'failed' });
  }
};

const startProcessing = async (userId) => {
  const qname = `queue_${userId}`;
  await queueService.createQueue(qname);
  await queueService.consumeQueue(qname, async (msg) => {
    try {
      await processRequest(msg);
    } catch (error) {
      console.error('Error processing message:', error);
      const { requestId } = JSON.parse(msg);
      await Request.findByIdAndUpdate(requestId, { status: 'failed' });
    }
  });
};

module.exports = { startProcessing };
