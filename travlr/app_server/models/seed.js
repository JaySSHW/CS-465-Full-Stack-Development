
const mongoose = require('mongoose');
const Trip = require('./travlr');
const trips = require('../../data/trips.json');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

const seedDatabase = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');

        // Remove existing trip records
        await Trip.deleteMany({});
        console.log('Existing trips removed');

        // Insert sample trip data
        const result = await Trip.insertMany(trips);
        console.log(`${result.length} trips inserted successfully`);

    } catch (err) {
        console.error('Database seeding error:', err);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
};

seedDatabase();
