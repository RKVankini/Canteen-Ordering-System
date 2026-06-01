const menu = [
{ id: 1, name: "Veg Burger", price: 80 },
{ id: 2, name: "Masala Dosa", price: 120 },
{ id: 3, name: "Cold Coffee", price: 60 },
{ id: 4, name: "Paneer Sandwich", price: 90 }
];

let cart = [];

/* =========================
REGISTER USER (MULESOFT)
========================= */

async function registerUser() {

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

// try {

// const response = await fetch(
//   "http://localhost:8081/api/register",
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: name,
//       email: email,
//       phone: "9876543210",
//       password: password
//     })
//   }
// );

const result = await response.json();

alert(result.message);

document.getElementById("registerName").value = "";
document.getElementById("registerEmail").value = "";
document.getElementById("registerPassword").value = "";


} catch (error) {

console.error(error);

alert(
  "Unable to connect to Mule API"
);
}
}

/* =========================
LOGIN (TEMPORARY)
========================= */

function loginUser() {

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

const savedUser =
JSON.parse(
localStorage.getItem(
"canteenUser"
)
);

if (
savedUser &&
savedUser.email === email &&
savedUser.password === password
) {

document.getElementById(
  "authSection"
).style.display = "none";

document.getElementById(
  "mainApp"
).style.display = "block";


} else {

alert(
  "Invalid credentials"
);


}
}

/* =========================
LOGOUT
========================= */

document
.getElementById("logoutBtn")
.addEventListener(
"click",
() => {

  document.getElementById(
    "authSection"
  ).style.display = "flex";

  document.getElementById(
    "mainApp"
  ).style.display = "none";
}

);

/* =========================
MENU
========================= */

const menuContainer =
document.getElementById(
"menu-items"
);

const cartContainer =
document.getElementById(
"cart-items"
);

const totalEl =
document.getElementById(
"total"
);

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

/* =========================
ADD TO CART
========================= */

function addToCart(id) {

const item =
menu.find(
food => food.id === id
);

const existing =
cart.find(
product => product.id === id
);

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

/* =========================
RENDER CART
========================= */

function renderCart() {

cartContainer.innerHTML = "";

let total = 0;

cart.forEach(item => {

total +=
  item.price * item.qty;

const div =
  document.createElement(
    "div"
  );

div.className =
  "cart-item";

div.innerHTML = `
  <h4>${item.name}</h4>

  <p>
    Quantity:
    ${item.qty}
  </p>

  <p>
    ₹${item.price * item.qty}
  </p>

  <button
    onclick=
    "removeFromCart(${item.id})">
    Remove
  </button>
`;

cartContainer
  .appendChild(div);

});

totalEl.textContent =
total;
}

/* =========================
REMOVE FROM CART
========================= */

function removeFromCart(id) {

cart =
cart.filter(
item =>
item.id !== id
);

renderCart();
}

/* =========================
CHECKOUT
========================= */

document
.getElementById("checkout")
.addEventListener(
"click",
() => {

  if (
    cart.length === 0
  ) {

    alert(
      "Cart is empty!"
    );

    return;
  }

  alert(
    "Order placed successfully!"
  );

  cart = [];

  renderCart();
}

);

/* =========================
INITIAL LOAD
========================= */

renderMenu();
