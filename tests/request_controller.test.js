const { enqueueRequest } = require('../controller/request_controller');
const Request = require('../model/request');
const queueService = require('../services/queueService');
const { connect } = require('../services/queueService');

jest.mock('../model/request');
jest.mock('../services/queueService');

describe('Request Controller Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Enqueue Request - Success', async () => {
    const mockReq = {
      user: {
        _id: 'mockUserId'
      },
      body: {
        requestData: { /* mock requestData */ }
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();

    const mockRequestLog = {
      _id: 'mockRequestId'
    };

    // Mocking Request.create to resolve with mockRequestLog
    Request.create.mockResolvedValue(mockRequestLog);

    // Mocking queueService methods
    queueService.createQueue.mockResolvedValue();
    queueService.sendToQueue.mockResolvedValue();

    // Calling the enqueueRequest function
    await enqueueRequest(mockReq, mockRes, mockNext);

    // Assertions
    expect(Request.create).toHaveBeenCalledWith({
      userId: mockReq.user._id,
      requestData: mockReq.body.requestData,
      status: 'queued'
    });

    const mockQueueName = `queue_${mockReq.user._id}`;
    const mockMessage = { requestId: mockRequestLog._id, requestData: mockReq.body.requestData };

    expect(queueService.createQueue).toHaveBeenCalledWith(mockQueueName);
    expect(queueService.sendToQueue).toHaveBeenCalledWith(mockQueueName, JSON.stringify(mockMessage));

    // Ensure response is correct
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Request Enqueued!', requestId: mockRequestLog._id });

    // Ensure next() was not called
    expect(mockNext).not.toHaveBeenCalled();
  });

  // Add more tests for error handling scenarios, validation, etc.
});
