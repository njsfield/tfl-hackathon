const request = require('request');

module.exports = {
    method: 'GET',
    path: '/get_bikes',
    handler: function (req, reply) {
      const lon = req.query.longtitude
      const lat = req.query.latitude
      // called get_id function
      const bike_ids = ["BikePoints_1","BikePoints_2", "BikePoints_3"]
      const url = "https://api.tfl.gov.uk/BikePoint/"
      request(url+"", function (error, response, body) {

      });
    }
  }
