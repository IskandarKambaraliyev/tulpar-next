FROM node:18

# Set the working directory
WORKDIR /app

# Copy Prisma schema and the prisma directory
COPY prisma ./prisma/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Generate Prisma Client binaries for the correct platform
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
