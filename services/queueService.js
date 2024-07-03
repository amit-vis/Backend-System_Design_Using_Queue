const amqp = require('amqplib');

let channel = null; // Define a global variable to hold the channel

// established the connection of rabbitMQ database
async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
    throw error;
  }
}

// here we have creating the queue
const createQueue = async (qname) => {
  try {
    if (!channel) {
      await connect(); // Ensure connection is established
    }
    channel.assertQueue(qname, { durable: true });
    console.log(`Queue ${qname} created`);
  } catch (error) {
    console.error('Error creating queue:', error);
  }
};

// here sending the queue the queue in channel
const sendToQueue = async (qname, message) => {
  try {
    if (!channel) {
      await connect(); // Ensure connection is established
    }
    channel.sendToQueue(qname, Buffer.from(message), { persistent: true });
    console.log(`Message sent to queue ${qname}: ${message}`);
  } catch (error) {
    console.error('Error sending to queue:', error);
  }
};

// function is basically acknowledge that message has been sent

const consumeQueue = async (qname, callback) => {
  try {
    if (!channel) {
      await connect(); // Ensure connection is established
    }

    await channel.assertQueue(qname, { durable: true });

    channel.consume(qname, async (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log(`Message received from queue ${qname}: ${message}`);

        try {
          await callback(message);
          channel.ack(msg); // Acknowledge message after successful processing
        } catch (error) {
          console.error('Error processing message:', error);
          // Handle errors here, possibly nack the message
          channel.nack(msg);
        }
      }
    });
  } catch (error) {
    console.error('Error consuming queue:', error);
  }
};


module.exports = { createQueue, sendToQueue, consumeQueue };
