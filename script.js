```javascript
const menu = [
  { id: 1, name: 'Veg Burger', price: 80 },
  { id: 2, name: 'Masala Dosa', price: 120 },
  { id: 3, name: 'Cold Coffee', price: 60 },
  { id: 4, name: 'Paneer Sandwich', price: 90 }
];

let cart = [];

const menuContainer = document.getElementById('menu-items');
const cartContainer = document.getElementById('cart-items');
const totalEl = document.getElementById('total');

function renderMenu() {
  menuContainer.innerHTML = '';
  menu.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<h3>${item.name}</h3><p>₹${item.price}</p><button onclick='addToCart(${item.id})'>Add</button>`;
    menuContainer.appendChild(div);
  });
}

function addToCart(id) {
  const item = menu.find(i => i.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  cartContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<h4>${item.name}</h4><p>Qty: ${item.qty}</p><p>₹${item.price * item.qty}</p><button onclick='removeFromCart(${item.id})'>Remove</button>`;
    cartContainer.appendChild(div);
  });
  totalEl.textContent = total;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length === 0) return alert('Cart is empty!');
  alert('Order placed successfully!');
  cart = [];
  renderCart();
});

renderMenu();
```

---
