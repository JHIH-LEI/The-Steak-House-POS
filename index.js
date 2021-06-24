const addFoodButton = document.querySelector('[data-pos="add-food"]')
const orderLists = document.querySelector('[data-order-lists]')
const checkoutBtn = document.querySelector('[data-pos="checkout"]')
const confirmCheckout = document.querySelector('#send')
let PRODUCT_CUSTOMIZE_OPT = 3
let rawOrderHistory = []
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
})

confirmCheckout.addEventListener('click', e => {
  // add order to order history
  steakPos.addToOrderHistory(rawOrderHistory)
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
            <h6 class="card-title" data-order-info>${food.name}</h6>
            <div class="card-text" data-order-info>${food.sauce}</div>
            <div class="card-text" data-order-info>${food.maturity}</div>
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
  let totalPrice = 0
  let totalOrder = 0
  let order = []
  let rawHTML = ``
  const modalContent = document.querySelector('.modal-body')
  // 訂單資料
  document.querySelectorAll('[data-order-info]').forEach(item => {
    order.push(item.textContent)
    rawHTML += `<div class="grid-item">${item.textContent}</div>`
  })

  // get all price on orders and add on
  document.querySelectorAll('[data-food-price]').forEach(food => {
    totalPrice += Number(food.textContent)
  })
  totalOrder = (order.length) / 3
  modalContent.innerHTML = `
  <div id="wrapper">${rawHTML}</div>
  <div class="text-right mt-3 mr-3">
  <p>共${totalOrder}份</p>
  <p>Total: ${totalPrice}</p>
  </div>
  `
  order.push(totalPrice)
  order.push(totalOrder)
  rawOrderHistory = order
}

Pos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(card => {
    card.remove()
  })
}

Pos.prototype.addToOrderHistory = function (data) {
  // 如果沒有設定這行，會造成每次新增訂單到歷史訂單，新資料會覆蓋舊資料
  // 所以需要先把已有的資料拿出來，將新資料加進去(push)
  const orderHistory = JSON.parse(localStorage.getItem('order')) || []
  // 將每筆餐點分裝好 一筆完整的餐點會有名字、醬料、熟度
  let ordersData = steakPos.group(data, 3)
  // 加上訂單時間
  const today = new Date()
  ordersData.push(today)
  // 包為整筆訂單
  ordersData = ordersData.join()
  // 將這筆訂單加入到歷史中
  orderHistory.push(ordersData)
  // 存進localStorage
  localStorage.setItem('order', JSON.stringify(orderHistory))
}

Pos.prototype.group = function (array, subGroupLength) {
  let index = 0;
  const newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength))
  }
  return newArray
}