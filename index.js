function Drink(name, ice, sugar) {
  this.name = name;
  this.ice = ice;
  this.sugar = sugar;
}

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

