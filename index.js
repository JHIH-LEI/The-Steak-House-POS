const addDrinkButton = document.querySelector('[data-pos="add-drink"]')
const orderLists = document.querySelector('[data-order-lists]')
// constructor function
function CrabPos() {
}

function Drink(name, ice, sugar) {
  this.name = name;
  this.ice = ice;
  this.sugar = sugar;
}

// // Constructor function for Drink

Drink.prototype.price = function () {
  // return drink price
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
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
CrabPos.prototype.addDrink = function (drink) {
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

CrabPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`input[name=${inputName}]`).forEach(item => {
    if (item.checked) {
      selectedOption = item.value
    }
  });
  return selectedOption
}

// create pos instance
const crabPos = new CrabPos()

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