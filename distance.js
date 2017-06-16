// Haversine formula example (translated from python to JS)

const fs = require('fs')

var allBikes = JSON.parse(fs.readFileSync('./TfL_bike_station_data.json'))

// findBikesIds(51.5320521, -0.1092356);

function findBikesIds(usrlon, usrlat){
    bPoints = allBikes.objects;
    var topIds = [];
    usrLoc = [usrlon, usrlat];
    bPoints.forEach(function(bPoint){
        var entry = {}
        entry[calcDistance(usrLoc, [bPoint.lat, bPoint.lon])] = bPoint.id;
        topIds.push(entry);
    });
    var sorted = topIds.slice(0).sort(function(a,b){
        var keys = Object.keys(topIds);
        return Object.keys(a)-Object.keys(b);
    });
    console.log(sorted.slice(0,3));
   return sorted.slice(0,3).map(function(name){return name[Object.keys(name)[0]]});
}

// Converts from coords-degrees to radians.
function radians(coords) {
  return coords * Math.PI / 180;
};

//calcDistance([51.5320521, -0.1092356] , [51.529163, -0.10997]);

function calcDistance(usrLoc, destination){

    const lat1 = usrLoc[1];
    const lon1 = usrLoc[0];
    const lat2 = destination[0];
    const lon2 = destination[1];
    const radius = 6371; // in km

    const dlat = radians(lat2-lat1);
    const dlon = radians(lon2-lon1);
    const a = Math.sin(dlat/2) * Math.sin(dlat/2) + Math.cos(radians(lat1))
              * Math.cos(radians(lat2)) * Math.sin(dlon/2) * Math.sin(dlon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = radius * c;

    return d;
}

module.exports = findBikesIds;
