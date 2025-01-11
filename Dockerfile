# Use Node.js 18-alpine as the base image
FROM node:18-alpine

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Set the working directory
WORKDIR /app

# Copy the Prisma schema and prisma directory
COPY prisma ./prisma/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (resolve peer dependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
