const ServiceProvider = require('../models/ServiceProvider');

const getServiceProviderProfile = async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findById(req.user.id);

    if (!serviceProvider) {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    res.json(serviceProvider);
  } catch (error) {
    console.error('Error fetching service provider profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getServiceProviderProfile };
