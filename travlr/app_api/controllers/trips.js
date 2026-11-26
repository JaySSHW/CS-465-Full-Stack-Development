const Trip = require('../models/travlr');

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

// GET: /api/trips/:tripCode - Retrieve a specific trip
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Trip.find({ code: req.params.tripCode }).exec();

        if (trips.length === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trips);
    } catch (err) {
        console.error('Error retrieving trip:', err);

        return res.status(500).json({ message: 'Error retrieving trip data' });
    }
};

// Export API controller functions
module.exports = {
    tripsList,
    tripsFindByCode
};
