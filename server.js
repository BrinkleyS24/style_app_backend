require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://192.168.1.110:8081', 
  credentials: true
}));

const PORT = process.env.PORT || 5000;

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
