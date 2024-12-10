# Use the official Node.js image as the base image
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy package.json
COPY backend/package.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY backend/ ./

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "dev"]