const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mentionRoutes = require('./routes/mentions');
const spikeRoutes = require('./routes/spikeRoutes');
const searchRoutes = require('./routes/search'); 
const cors = require('cors');


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
app.use(cors({
  origin: ["http://localhost:3000", "https://brand-reputation-monitor.vercel.app"],
  credentials: true
}));
app.use(express.json());

const { aggregateAndSaveBrands } = require('./services/autofetch');
setInterval(aggregateAndSaveBrands, 4 * 60 * 1000); 

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://brand-reputation-monitor.vercel.app"],
    methods: ["GET", "POST"]
  }
});



io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.get('/api/health', (req, res) => res.send('API is running'));
app.use('/api/mentions', mentionRoutes);
app.use('/api/search', searchRoutes);
app.use('/api', spikeRoutes);

app.set('io', io)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

