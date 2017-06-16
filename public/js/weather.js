fetch('/data/weather.json', { method: 'GET', })
  .then(res => res.json())
  .then(data => {
    Object.keys(data).forEach((key) => {
      document.getElementById(key).textContent = data[key]
    })
  })

  document.getElementById("fetch").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((data) => {
      const endpoint = `get_bikes/?longitude=${data.coords.longitude}&latitude=${data.coords.longitude}`
      console.log(endpoint);
    })
  })
