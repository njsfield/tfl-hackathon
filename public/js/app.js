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

const load = (data, root) => {
  document.getElementById("fetched").classList.remove("hidden")
  const rootElement = document.getElementById(root)

  data.forEach(point => {
    const listItem = document.createElement('li')
    const container = document.createElement('div')
    listItem.appendChild(container)
    const location = document.createElement('p')
    location.textContent = point.location

    const nbBikes = document.createElement('p')
    nbBikes.textContent = point.bikes;

    const button = document.createElement('button')
    button.textContent = "View map";

    [ location, nbBikes, button, ].forEach(el => {
      container.appendChild(el)
    })

    rootElement.appendChild(listItem)
  })
}

load(data, 'fetched')
