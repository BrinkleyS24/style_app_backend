const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', serviceRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', reviewRoutes);
app.use(errorMiddleware);

module.exports = app;
