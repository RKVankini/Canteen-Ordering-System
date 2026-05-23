const menu = [
  { id: 1, name: "Veg Burger", price: 80 },
  { id: 2, name: "Masala Dosa", price: 120 },
  { id: 3, name: "Cold Coffee", price: 60 },
  { id: 4, name: "Paneer Sandwich", price: 90 }
];

let cart = [];

/* Authentication */

function registerUser() {

  const name =
    document.getElementById("registerName").value;

  const email =
    document.getElementById("registerEmail").value;

  const password =
    document.getElementById("registerPassword").value;

  if (!name || !email || !password) {

    alert("Please fill all fields");

    return;
  }

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem(
    "canteenUser",
    JSON.stringify(user)
  );

  alert("Registration successful!");
}

function loginUser() {

  const email =
    document.getElementById("loginEmail").value;

  const password =
    document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(
    localStorage.getItem("canteenUser")
  );

  if (
    savedUser &&
    savedUser.email === email &&
    savedUser.password === password
  ) {

    document.getElementById("authSection")
      .style.display = "none";

    document.getElementById("mainApp")
      .style.display = "block";

  } else {

    alert("Invalid credentials");
  }
}

/* Logout */

document.getElementById("logoutBtn")
  .addEventListener("click", () => {

    document.getElementById("authSection")
      .style.display = "flex";

    document.getElementById("mainApp")
      .style.display = "none";
  });

/* Menu */

const menuContainer =
  document.getElementById("menu-items");

const cartContainer =
  document.getElementById("cart-items");

const totalEl =
  document.getElementById("total");

function renderMenu() {

  menuContainer.innerHTML = "";

  menu.forEach(item => {

    const div =
      document.createElement("div");

    div.className = "item";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>

      <button onclick="addToCart(${item.id})">
        Add To Cart
      </button>
    `;

    menuContainer.appendChild(div);
  });
}

function addToCart(id) {

  const item =
    menu.find(food => food.id === id);

  const existing =
    cart.find(product => product.id === id);

  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      ...item,
      qty: 1
    });
  }

  renderCart();
}

function renderCart() {

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.qty;

    const div =
      document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <h4>${item.name}</h4>

      <p>Quantity: ${item.qty}</p>

      <p>₹${item.price * item.qty}</p>

      <button onclick="removeFromCart(${item.id})">
        Remove
      </button>
    `;

    cartContainer.appendChild(div);
  });

  totalEl.textContent = total;
}

function removeFromCart(id) {

  cart = cart.filter(
    item => item.id !== id
  );

  renderCart();
}

/* Checkout */

document.getElementById("checkout")
  .addEventListener("click", () => {

    if (cart.length === 0) {

      alert("Cart is empty!");

      return;
    }

    alert("Order placed successfully!");

    cart = [];

    renderCart();
  });

renderMenu();
