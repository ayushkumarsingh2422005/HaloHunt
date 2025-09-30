import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PORT, NODE_ENV } from './config/config.js';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorMiddleware.js';

// For colored logs in development
const isDev = process.env.NODE_ENV === 'development';
let chalk;
if (isDev) {
  try {
    chalk = (await import('chalk')).default;
  } catch (e) {
    chalk = null;
  }
}

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Product tagging namespace
const productNamespace = io.of('/products');

// Socket.IO connection handling
productNamespace.on('connection', (socket) => {
  console.log('User connected to products namespace:', socket.id);

  // Join stream room
  socket.on('join-stream', (streamId) => {
    socket.join(streamId);
    console.log(`User ${socket.id} joined stream room: ${streamId}`);
  });

  // Leave stream room
  socket.on('leave-stream', (streamId) => {
    socket.leave(streamId);
    console.log(`User ${socket.id} left stream room: ${streamId}`);
  });

  // Handle product tagging
  socket.on('tag-product', async (data) => {
    const { streamId, product, action } = data;
    
    try {
      // Broadcast to all users in the stream room
      socket.to(streamId).emit('product-tagged', {
        product,
        action, // 'add' or 'remove'
        timestamp: new Date().toISOString()
      });
      
      console.log(`Product ${action} broadcasted in stream ${streamId}:`, product.name);
    } catch (error) {
      console.error('Error broadcasting product tag:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from products namespace:', socket.id);
  });
});

// Body parser
app.use(express.json());

// Enable CORS with specific options
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Request logger middleware to log all endpoints hit, including response status and data
app.use((req, res, next) => {
  const now = new Date().toISOString();

  // Store original send
  const originalSend = res.send;

  res.send = function (body) {
    let logMsg = `[${now}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Response: ${typeof body === 'object' ? JSON.stringify(body) : body}`;
    if (isDev && chalk) {
      // Color method, status, and errors
      let methodColor = chalk.cyan;
      if (req.method === 'POST') methodColor = chalk.green;
      if (req.method === 'PUT') methodColor = chalk.yellow;
      if (req.method === 'DELETE') methodColor = chalk.red;
      let statusColor = chalk.white;
      if (res.statusCode >= 500) statusColor = chalk.bgRed.white.bold;
      else if (res.statusCode >= 400) statusColor = chalk.red;
      else if (res.statusCode >= 300) statusColor = chalk.yellow;
      else if (res.statusCode >= 200) statusColor = chalk.green;

      logMsg =
        chalk.gray(`[${now}] `) +
        methodColor(req.method) +
        ' ' +
        chalk.magenta(req.originalUrl) +
        ' - Status: ' +
        statusColor(res.statusCode) +
        ' - Response: ' +
        chalk.gray(typeof body === 'object' ? JSON.stringify(body) : body);
    }
    console.log(logMsg);
    // Call original send
    return originalSend.call(this, body);
  };

  next();
});

// Mount routes
app.use(routes);

// Error handler middleware
app.use(errorHandler);

server.listen(PORT, () => {
  if (isDev && chalk) {
    console.log(
      chalk.bgBlue.white.bold(
        `Server running in ${NODE_ENV} mode on port ${PORT}`
      )
    );
  } else {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  if (isDev && chalk) {
    console.log(chalk.bgRed.white.bold(`Error: ${err.message}`));
  } else {
    console.log(`Error: ${err.message}`);
  }
  // Close server & exit process
  server.close(() => process.exit(1));
}); 