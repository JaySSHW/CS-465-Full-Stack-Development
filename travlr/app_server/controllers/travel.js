// Define the RESTful API endpoint
const tripsEndpoint = 'http://localhost:3000/api/trips';

// Configure the API request
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Previous static JSON data source
// const trips = require('../../data/trips.json');

/* GET travel page */
const travel = async (req, res) => {
    await fetch(tripsEndpoint, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            let message = null;

            // Verify that the API returned an array
            if (!Array.isArray(json)) {
                message = 'API response was not an array';
                json = [];
            }else if (json.length === 0) {
                message = 'No trips found in the database';
            }

            // Render the travel page using API data
            res.render('travel', {
                title: 'Travlr Getaways - Travel',
                trips: json,
                message: message
            });
        })
        .catch(err => {
            console.error('Error retrieving trips:', err);
            res.status(500).send(err.message);
            });
        };

        // Export the travel controller
module.exports = {
    travel
};