const data = [
  {
    location: "location1",
    bikes: 5,
  },
  {
    location: "location2",
    bikes: 7,
  },
]

const load = (data) => {
  const fetched = document.getElementById("fetched");
  fetched.classList.remove("hidden")
  fetched.classList.add("visible")
  fetched.scrollIntoView({ behavior: 'smooth' })

  const rootElement = document.getElementById("bike-points")

  data.forEach(point => {
    const listItem = document.createElement('li')
    listItem.classList.add("item")
    const container = document.createElement('div')
    listItem.appendChild(container)
    const location = document.createElement('p')
    location.textContent = point.commonName

    const nbBikes = document.createElement('p')
    nbBikes.textContent = point.bikesAvailable + ' bikes available!';

    const button = document.createElement('button')
    button.textContent = "View map";

    [ location, nbBikes, button, ].forEach(el => {
      container.appendChild(el)
    })

    rootElement.appendChild(listItem)
  })
}
