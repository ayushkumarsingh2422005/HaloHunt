import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connectDB from './config/db.js';
import routes from './routes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount API routes
app.use('/api', routes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'HaloHunt API is running' 
  });
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler middleware
app.use(errorHandler);

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
