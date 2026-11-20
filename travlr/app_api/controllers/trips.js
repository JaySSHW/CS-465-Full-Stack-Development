const mongoose = require('mongoose');
const Trip = require('../../app_server/models/travlr');

// GET: /api/trips - retrieve all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});

        return res.status(200).json(trips);
    } catch (err) {
        console.error('Error retrieving trips:', err);
        return res.status(500).json({ message: 'Error retrieving trips data' });

    }
};

module.exports = {
    tripsList,
};