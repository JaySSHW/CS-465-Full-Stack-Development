const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Retrieve all trips from MongoDB
router.get('/trips', tripsController.tripsList);

module.exports = router;