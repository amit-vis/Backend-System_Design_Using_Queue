
const amqp = require('amqplib/callback_api');

let channel = null;

// Connect to RabbitMQ server
amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, ch) => {
    if (error1) {
      throw error1;
    }
    channel = ch;
  });
});

const createQueue = async (qname) => {
  try {
    if (channel) {
      channel.assertQueue(qname, { durable: true });
      console.log(`Queue ${qname} created`);
    }
  } catch (error) {
    console.error('Error creating queue:', error);
  }
};

const sendToQueue = async (qname, message) => {
  try {
    if (channel) {
      channel.sendToQueue(qname, Buffer.from(message), { persistent: true });
      console.log(`Message sent to queue ${qname}: ${message}`);
    }
  } catch (error) {
    console.error('Error sending to queue:', error);
  }
};

const consumeQueue = async (qname, callback) => {
  try {
    if (channel) {
      channel.assertQueue(qname, { durable: true });
      channel.consume(qname, (msg) => {
        if (msg !== null) {
          const message = msg.content.toString();
          console.log(`Message received from queue ${qname}: ${message}`);
          callback(message).then(() => {
            channel.ack(msg);
          });
        }
      });
    }
  } catch (error) {
    console.error('Error consuming queue:', error);
  }
};

module.exports = { createQueue, sendToQueue, consumeQueue };

