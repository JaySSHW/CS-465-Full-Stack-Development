const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// GET: Retrieve all trips from MongoDB
router.get('/trips', tripsController.tripsList);

// GET: Retrieve a specific trip by its code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;