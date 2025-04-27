FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Expose port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
