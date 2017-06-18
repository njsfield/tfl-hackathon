(function(){

  var byId     = function(x){return document.getElementById(x)},
      elt      = function(x){return document.createElement(x)},
      geo      = function(x){return navigator.geolocation.getCurrentPosition(x)},
      rain_key = "rain",
      pol_key  = "polution";

  // Get weather data 
  fetch('/data/weather.json', { method: 'GET' })
    .then(function(res){return res.json()})
    .then(function(data){

      // Set Rain Percentage
      byId("rain")
        .textContent = data["rain"]

      // Set Polution Class
      byId("pollution")
        .classList
        .add(data["pollution"])
    })

  // On clicking 'Lets Bike'
  byId("fetch")
    .addEventListener("click", function(e){
      // Get location
      
      e.target.textContent = "Loading...";

      geo(function(data){
      var lon = data.coords.longitude,
          lat = data.coords.latitude;

      // Build endpoint
      var endpoint = 'get_bikes?longitude='
                   + lon 
                   + '&latitude=' 
                   + lat;
      // Fetch
      fetch(endpoint, { method: 'GET', })
        .then(function(res){return res.json()})
        .then(inject)
        .then(function(){e.target.textContent = "See below"})
    })
  })


  //Inject Bikes into Page
  function inject (data){

    var bikesPage      = byId("bikes"),
        bikesOutput    = byId("bikes__output"),
        hiddenClass    = "bikes--hidden",
        bikePointClass = "bike";
       
        // 1. Display Bikes Page & scroll to
        bikesPage.classList.remove(hiddenClass)
        bikesPage.scrollIntoView({ block: "end",  behavior: 'smooth' })

    // Generate bike point components
    data.forEach(function(point){

      // Google Maps Href
      var geoHref = 'http://maps.google.com/?q='
                  + point.latitude 
                  + ','
                  + point.longitude;

      var bike = elt('li')
          bike.classList.add("bike")

      var info = elt('div')
          info.classList.add("bike__info")

      var location = elt('h3')
          location.classList.add("bike__location") 
          location.textContent = point.commonName

      var count = elt('p')
          count.classList.add("bike__count")
          count.textContent = point.bikesAvailable + ' bikes available!';

      var btn = elt('button')
          btn.classList.add("bike__btn")
          btn.setAttribute('href', geoHref)
          // Add onClick handler (mimic anchor tag temporarily)
          btn.setAttribute('onClick', 'location.href = "' + geoHref + '"')
          btn.textContent = "View map";

      // Place location & count in info container 
      [ location, count ].forEach(el => {
        info.appendChild(el)
      });

      // Place info & button in bike container 
      [ info, btn ].forEach(el => {
        bike.appendChild(el)
      });

      // Append to Bikes Output
      bikesOutput.appendChild(bike)
    })
  }
})();
