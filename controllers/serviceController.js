const Service = require('../models/Service');

exports.createService = async (req, res) => {
  const { name, description, price, duration } = req.body;
  try {
    const service = new Service({ name, description, price, duration });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
