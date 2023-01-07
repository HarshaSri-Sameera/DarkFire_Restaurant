const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")
const openPopUp = document.querySelectorAll("[data-popup-target]")
const closePopUp = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById('overlay')

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
            card.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/html", card.outerHTML)
            })
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

// table-UI search
function myTableFunction() {
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

// Update table-UI elements
const table1 = document.querySelector("#table1")
const cost1 = document.querySelector("#cost1")
const total1 = document.querySelector("#total1")
const bill1 = document.querySelector(".bill1")
const table2 = document.querySelector("#table2")
const cost2 = document.querySelector("#cost2")
const total2 = document.querySelector("#total2")
const table3 = document.querySelector("#table3")
const cost3 = document.querySelector("#cost3")
const total3 = document.querySelector("#total3")

var table1Items = {}
// var table1Items = { "Biriyani": 10, "FriedRice": 20 }
var table2Items = {}
var table3Items = {}


table1.addEventListener("dragover", (e) => {
    e.preventDefault()
})

table1.addEventListener("drop", (e) => {
    const cardHTML = e.dataTransfer.getData("text/html")
    const card = new DOMParser().parseFromString(cardHTML, "text/html").body.firstChild
    const cardPrice = card.querySelector("[data-body]").textContent

    cost1.textContent = parseInt(cost1.textContent) + parseInt(cardPrice)
    total1.textContent = parseInt(total1.textContent) + 1

    // store items and price in the table1Items
    const cardTitle = card.querySelector("[data-header]").textContent
    if (table1Items[cardTitle]) {
      table1Items[cardTitle] = parseInt(table1Items[cardTitle]) + parseInt(cardPrice);
    } else {
      table1Items[cardTitle] = cardPrice;
    }

    console.log(table1Items);
})

table2.addEventListener("dragover", (e) => {
    e.preventDefault()
})
table2.addEventListener("drop", (e) => {
    const cardHTML = e.dataTransfer.getData("text/html")
    const card = new DOMParser().parseFromString(cardHTML, "text/html").body.firstChild
    const cardPrice = card.querySelector("[data-body]").textContent

    cost2.textContent = parseInt(cost2.textContent) + parseInt(cardPrice)
    total2.textContent = parseInt(total2.textContent) + 1

    // store items in the table drop
    const cardTitle = card.querySelector("[data-header]").textContent
    if (table2Items[cardTitle]) {
        table2Items[cardTitle] = parseInt(table2Items[cardTitle]) + parseInt(cardPrice);
    } else {
        table2Items[cardTitle] = cardPrice;
    }
    console.log(table2Items);
})

table3.addEventListener("dragover", (e) => {
    e.preventDefault()
})
table3.addEventListener("drop", (e) => {
    const cardHTML = e.dataTransfer.getData("text/html")
    const card = new DOMParser().parseFromString(cardHTML, "text/html").body.firstChild
    const cardPrice = card.querySelector("[data-body]").textContent

    cost3.textContent = parseInt(cost3.textContent) + parseInt(cardPrice)
    total3.textContent = parseInt(total3.textContent) + 1

    // store items in the table drop
    const cardTitle = card.querySelector("[data-header]").textContent
    if (table3Items[cardTitle]) {
        table3Items[cardTitle] = parseInt(table3Items[cardTitle]) + parseInt(cardPrice);
    } else {
        table3Items[cardTitle] = cardPrice;
    }
    console.log(table3Items);
})

// function BillCheckOut(pageTitle, popupWinWidth, popupWinHeight) {
//     var left = (screen.width - popupWinWidth) / 2;
//     var top = (screen.height - popupWinHeight) / 2;
//     var myWindow = window.open("", pageTitle, "resizable=yes, width=" + popupWinWidth + ", height=" + popupWinHeight + ", left=" + left + ", top=" + top +"");
//     myWindow.document.write("<h1>Order Details</h1>");
//     myWindow.document.write("");
// }

// Popup window
openPopUp.forEach(a => {
    a.addEventListener('click', () => {
        const data = document.querySelector(a.dataset.popupTarget)
        openData(data)
    })
})

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active')
    popups.forEach(popup => {
        closeData(popup)
    })
})

closePopUp.forEach(button => {
    button.addEventListener('click' ,() => {
        const data = button.closest('.popup')
        closeData(data)
    })
})

function openData(data) {
    if(data == null) return
    data.classList.add('active')
    overlay.classList.add('active')
}

function closeData(data){
    if(data == null) return
    data.classList.remove('active')
    overlay.classList.remove('active')
}

// bill checkout table
function myBillFunction(id) {    
    if (id == "table1") {
        for (const item in table1Items) {
            var item_ = item;
            var cost_ = table1Items[item];
            const totalCost = document.querySelector("#totalCost")
            var newRow = document.createElement('tr');
            document.querySelector('#myTable_PopUp').appendChild(newRow);

            var billId = document.createElement('td');
            billId.textContent = Object.keys(table1Items).indexOf(item_) + 1;
            
            newRow.appendChild(billId);
          
            var billName = document.createElement('td');
            billName.textContent = item_;
            newRow.appendChild(billName);
          
            var billPrice = document.createElement('td');
            billPrice.textContent = cost_;
            newRow.appendChild(billPrice);

            totalCost.textContent = parseInt(totalCost.textContent) + parseInt(cost_)
        }
        // for (const key of Object.keys(table1Items)) {
        //     totalCost.textContent = parseInt(totalCost.textContent) + parseInt(table1Items[key]); 
        // }
        // console.log(totalCost.textContent);
    }
    else if (id == "table2") {
        for (const item in table2Items) {
            var item_ = item;
            var cost_ = table2Items[item];
            const totalCost = document.querySelector("#totalCost")
            var newRow = document.createElement('tr');
            document.querySelector('#myTable_PopUp').appendChild(newRow);

            var billId = document.createElement('td');
            billId.textContent = Object.keys(table2Items).indexOf(item_) + 1;
            
            newRow.appendChild(billId);
          
            var billName = document.createElement('td');
            billName.textContent = item_;
            newRow.appendChild(billName);
          
            var billPrice = document.createElement('td');
            billPrice.textContent = cost_;
            newRow.appendChild(billPrice);

            totalCost.textContent = parseInt(totalCost.textContent) + parseInt(cost_)
        }
    }
    else if (id == "table3") {
        for (const item in table3Items) {
            var item_ = item;
            var cost_ = table3Items[item];
            const totalCost = document.querySelector("#totalCost")
            var newRow = document.createElement('tr');
            document.querySelector('#myTable_PopUp').appendChild(newRow);

            var billId = document.createElement('td');
            billId.textContent = Object.keys(table3Items).indexOf(item_) + 1;
            
            newRow.appendChild(billId);
          
            var billName = document.createElement('td');
            billName.textContent = item_;
            newRow.appendChild(billName);
          
            var billPrice = document.createElement('td');
            billPrice.textContent = cost_;
            newRow.appendChild(billPrice);

            totalCost.textContent = parseInt(totalCost.textContent) + parseInt(cost_)
        }
    }

}

function closeBillPopUp(){
    var table = document.getElementById("myTable_PopUp");
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }
    document.getElementById("totalCost").innerHTML = 0;
}


function clicked(event) {
    var p = document.querySelector('.clicked-item');
    p.textContent = '(' + event.target.textContent + ')' + ' Order Details';
}

// clear the values on clicking generate bill
function GenerateBill() {
    var access = document.querySelector('.clicked-item');
    var accessPro = access.textContent;
    var txt = accessPro.substring(1, 9);

    closeBillPopUp();

    if (confirm('Are you sure you want to generate "' + txt + '" bill?')) {
        // Generate bill
        if (txt == "Table -1") {
            cost1.innerHTML = 0;
            total1.innerHTML = 0;
            alert("Bill Generated for: " + txt);
        }
        else if(txt == "Table -2") {
            cost2.innerHTML = 0;
            total2.innerHTML = 0;
            alert("Bill Generated for: " + txt);
        }
        else if(txt == "Table -3") {
            cost3.innerHTML = 0;
            total3.innerHTML = 0;
            alert("Bill Generated for: " + txt);
        }
    } else {
        // Do nothing!
    }
}

