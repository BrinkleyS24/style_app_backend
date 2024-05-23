// routes/serviceRoutes.js
const express = require('express');
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/services', authMiddleware, serviceController.createService);
router.get('/services', serviceController.getServices);

module.exports = router;
