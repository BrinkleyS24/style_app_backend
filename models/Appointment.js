const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  customer: { type: String, required: true }, 
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
