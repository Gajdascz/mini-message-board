# Use latest Node lts version (20.13.1)
FROM node:20.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package and package-lock JSON files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of application code
COPY . .

# Expose port the application will run on
EXPOSE 3000

# Define command to execute program
CMD ["node","app.js"]