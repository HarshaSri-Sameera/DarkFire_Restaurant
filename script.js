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

function myFunction() {
    var input, filter, cards, cardContainer, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myTable");
    cards = cardContainer.getElementsByClassName("Tcard");
    for (i = 0; i < cards.length; i++) {
      title = cards[i].querySelector(".card-title");
      if (title.innerText.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
}
  