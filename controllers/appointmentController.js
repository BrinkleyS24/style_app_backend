const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  const { serviceProviderId, customerId, serviceId, date, time } = req.body;
  try {
    const appointment = new Appointment({ serviceProvider: serviceProviderId, customer: customerId, service: serviceId, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ serviceProvider: req.user.id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
