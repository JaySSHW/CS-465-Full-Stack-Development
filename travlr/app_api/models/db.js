const mongoose = require('mongoose');
const readline = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}:27017/travlr`;

// Connect to MongoDB
const connect = () => {
    setTimeout(() => {
        mongoose.connect(dbURI).catch((err) => {
            console.error('Mongoose connection failed:', err);
            });
            }, 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows-specific listener
if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// Graceful shutdown
const gracefulShutdown = async(msg) => {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
};

// Application termination
process.on('SIGINT', async() => {
    await gracefulShutdown('app termination');
        process.exit(0);
});

// Container termination
process.once('SIGTERM', async() => {
    await gracefulShutdown('app shutdown');
        process.exit(0);
});

//Nodemon restart
process.once('SIGUSR2', async() => {
    await gracefulShutdown('nodemon restart');
        process.kill(process.pid, 'SIGUSR2');
});

// Initialize database connection
connect();

// Import trip schema
require('./travlr');

module.exports = mongoose;

