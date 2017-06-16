const request = require('request');

const url = "https://api.tfl.gov.uk/BikePoint/"

const bikeProm = (url) => {
  return new Promise((resolve,reject) => {
    request(url, (err, response, body) => {
      return err ? reject(err) : resolve(JSON.parse(body))
    })
  })
}

const replyBikes = (bike_ids, reply) => {
  // Get all (from array of requests)
  Promise.all(bike_ids.map((id) => bikeProm(url + id)))
    .then(bikeObjs => {
      // Make data array of objects
      const data = bikeObjs.map(bikeObj => {
        const commonName = bikeObj.commonName;
        const longitude = bikeObj.lon;
        const latitude = bikeObj.lat;
        // Access nested array
        const bikesAvailable = bikeObj
          .additionalProperties
          .filter(propObj => propObj.key === "NbBikes")[0]
          .value
        // Reply
        return {
          commonName,
          longitude,
          latitude,
          bikesAvailable
        }
      }) // end of bikeObj map
      reply(JSON.stringify(data))
    })
    .catch(e => console.log(e))
}

module.exports = {
    method: 'GET',
    path: '/get_bikes',
    handler: function (req, reply) {
      const { longitude, latitude } = req.query;
      // called get_id function
      console.log({ longitude, latitude });
      const bike_ids = require('./distance.js')(longitude, latitude)
      console.log(bike_ids);
      // const bike_ids = ["BikePoints_1","BikePoints_2", "BikePoints_3"]
      replyBikes(bike_ids, reply);
    }
  }
