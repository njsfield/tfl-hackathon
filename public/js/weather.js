var byId     = function(x){return document.getElementById(x)},
    geo      = function(x){return navigator.geolocation.getCurrentPosition(x)},
    rain_key = "rain",
    pol_key  = "polution";

fetch('/data/weather.json', { method: 'GET', })
  .then(res => res.json())
  .then(data => {

    // Set Rain Percentage
    byId("rain")
      .textContent = data["rain"]

    // Set Polution Class
    byId("pollution")
      .classList
      .add(data["pollution"])
  })

// On Clicking 'Lets Bike'
byId("fetch")
  .addEventListener("click", () => {
    // Get location
    geo((data) => {
    var lon = data.coords.longitude,
        lat = data.coords.latitude;

    // Build endpoint
    var endpoint = 'get_bikes?longitude='
                 + lon 
                 + '&latitude=' 
                 + lat;
    // Fetch
    fetch(endpoint, { method: 'GET', })
      .then(res => res.json())
      .then(load)
  })
})
