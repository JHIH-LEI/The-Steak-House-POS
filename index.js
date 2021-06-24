const addDrinkButton = document.querySelector('[data-pos="add-drink"]')
const orderLists = document.querySelector('[data-order-lists]')
const checkoutBtn = document.querySelector('[data-pos="checkout"]')
// constructor function
function Pos() {
}

function Drink(name, ice, sugar) {
  this.name = name;
  this.ice = ice;
  this.sugar = sugar;
}

// create pos instance
const crabPos = new Pos()

// add order
addDrinkButton.addEventListener('click', () => {
  // get order list value
  const drink = crabPos.getCheckedValue('drink')
  const ice = crabPos.getCheckedValue('ice')
  const sugar = crabPos.getCheckedValue('sugar')

  // If no drink being chose then remind user
  if (!drink) {
    alert("You need select drink before you order sth")
    return
  }
  // create drink instance
  const orderDrink = new Drink(drink, ice, sugar)
  // add to order list
  crabPos.addDrink(orderDrink)
})

orderLists.addEventListener('click', (e) => {
  let deleteBtn = e.target.matches('[data-pos="delete-drink"]')
  if (!deleteBtn) {
    return
  }
  crabPos.deleteOrder(e.target.parentElement.parentElement.parentElement)
})

checkoutBtn.addEventListener('click', () => {
  // get total count
  crabPos.checkout()
  // clean order list
  crabPos.clearOrder(orderLists)
})

// // Constructor function for Drink

Drink.prototype.price = function () {
  // return drink price
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Black coffee':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

// // Constructor function for Pos System
Pos.prototype.addDrink = function (drink) {
  let orderItemHTML = `<div class="card mb-3">
          <div class="card-body pt-3 pr-3">
            <!-- delete drink icon -->
            <div class="text-right">
              <span data-pos="delete-drink">×</span>
            </div>
            <!-- /delete drink icon -->
            <h6 class="card-title">${drink.name}</h6>
            <div class="card-text">${drink.ice}</div>
            <div class="card-text">${drink.sugar}</div>
          </div>
          <div class="card-footer text-right">
            <div class="card-text text-muted">
              $ <span data-drink-price>${drink.price()}</span>
            </div>
          </div>`
  orderLists.insertAdjacentHTML('afterbegin', orderItemHTML)
}

Pos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`input[name=${inputName}]`).forEach(item => {
    if (item.checked) {
      selectedOption = item.value
    }
  });
  return selectedOption
}

Pos.prototype.deleteOrder = function (target) {
  target.remove()
}

Pos.prototype.checkout = function () {
  let total = 0
  // get all price on orders and add on
  document.querySelectorAll('[data-drink-price]').forEach(drink => {
    total += Number(drink.textContent)
  })
  alert(`total: ${total}`)
}

Pos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(card => {
    card.remove()
  })
}