// Activity 1: Using the reduce method to get the total price
// of all the items in the provided array.
const items = [{ price: 10 }, { price: 20 }, { price: 14 }, { price: 1 }, { price: 6 }]

const total = items.reduce((total, item) => total + item.price, 0)
console.log(total)
