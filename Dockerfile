# Use the official node.js image
From node:14

# Create and change to app directory
WORKDIR /index

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the app
CMD ["node", "index.js"]