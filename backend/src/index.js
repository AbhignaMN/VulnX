const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const assetsRouter = require('./routes/assets');
const scansRouter = require('./routes/scans');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assets', assetsRouter);
app.use('/api/scans', scansRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'vulnx-api' });
});

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
db.initialize().then(() => {
  server.listen(PORT, () => console.log(`VulnX API running on port ${PORT}`));
}).catch((err) => {
  console.error('Unable to initialize database:', err.message);
  process.exit(1);
});
