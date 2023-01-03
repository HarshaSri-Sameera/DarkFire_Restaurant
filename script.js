const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            header.textContent = user.name
            body.textContent = user.price
            userCardContainer.append(card)
            return { name: user.name, price: user.price, element: card }
        })
    });

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible =
        user.name.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

