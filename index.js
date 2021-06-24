const addFoodButton = document.querySelector('[data-pos="add-food"]')
const orderLists = document.querySelector('[data-order-lists]')
const checkoutBtn = document.querySelector('[data-pos="checkout"]')
// constructor function
function Pos() {
}

function Food(name, sauce, maturity) {
  this.name = name;
  this.sauce = sauce;
  this.maturity = maturity;
}

// create pos instance
const steakPos = new Pos()

// add order
addFoodButton.addEventListener('click', () => {
  // get order list value
  const food = steakPos.getCheckedValue('food')
  const sauce = steakPos.getCheckedValue('sauce')
  const maturity = steakPos.getCheckedValue('maturity')

  // If no food being chose then remind user
  if (!food) {
    alert("You need select food before you order sth")
    return
  }
  // create food instance
  const orderFood = new Food(food, sauce, maturity)
  // add to order list
  console.log(orderFood)
  steakPos.addFood(orderFood)
})

orderLists.addEventListener('click', (e) => {
  let deleteBtn = e.target.matches('[data-pos="delete-food"]')
  if (!deleteBtn) {
    return
  }
  steakPos.deleteOrder(e.target.parentElement.parentElement.parentElement)
})

checkoutBtn.addEventListener('click', () => {
  // get total count
  steakPos.checkout()
  // clean order list
  steakPos.clearOrder(orderLists)
})

// // Constructor function for Drink

Food.prototype.price = function () {
  // return food price
  switch (this.name) {
    case 'CLASSIC BURGER':
      return 250
    case 'CLASSIC FILET':
    case 'PRIME LAMB CHOP':
      return 700
    case 'RIBEYE':
    case 'NEW YORK STRIP':
    case 'RUMP':
      return 800
    case 'PRIME T-BONE':
      return 1000
    case 'A5 JP WAGYU':
      return 2300
    default:
      alert('No this food')
  }
}

// // Constructor function for Pos System
Pos.prototype.addFood = function (food) {
  let orderItemHTML = `<div class="card mb-3">
          <div class="card-body pt-3 pr-3">
            <!-- delete drink icon -->
            <div class="text-right">
              <span data-pos="delete-food">×</span>
            </div>
            <!-- /delete drink icon -->
            <h6 class="card-title">${food.name}</h6>
            <div class="card-text">${food.sauce}</div>
            <div class="card-text">${food.maturity}</div>
          </div>
          <div class="card-footer text-right">
            <div class="card-text text-muted">
              $ <span data-food-price>${food.price()}</span>
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
  document.querySelectorAll('[data-food-price]').forEach(drink => {
    total += Number(drink.textContent)
  })
  alert(`total: ${total}`)
}

Pos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(card => {
    card.remove()
  })
}