import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
const menu = document.getElementById("menu");
const checkout = document.getElementById("checkout");
const checkoutList = document.getElementById("checkout-items");
const totalPriceEl = document.getElementById("total-price");
const paymentModal = document.getElementById("payment-modal");
const paymentForm = document.getElementById("payment-form");

let checkoutItems = [];
let totalPrice = 0;

menu.innerHTML = renderMenu(menuArray);

menu.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-btn")) {
    handleAddToCart(event.target.dataset.name, event.target.dataset.price);
  }
});

checkout.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.dataset.removeId) {
    handleRemoveFromCart(
      event.target.dataset.removeId,
      event.target.dataset.removePrice
    );
  } else if (event.target.id === "checkout-btn") {
    paymentModal.classList.remove("hidden");
  }
});

paymentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(paymentForm);
  pay(formData.get("name"));
});

function renderMenu(menu) {
  let menuHtml = "";

  menu.forEach(function (item) {
    let ingredients = "";
    item.ingredients.forEach(function (ingredient, index) {
      ingredients += ingredient;
      if (item.ingredients.length - 1 > index) {
        // If NOT last item in array, add comma after
        ingredients += ", ";
      }
    });
    menuHtml += `
  <section id="${item.id}" class="menu-item">
      <span class="food-pic">${item.emoji}</span>
      <div class="details">
          <h3 class="food-name">${item.name}</h3>
          <p class="ingredients">${ingredients}</p>
          <p class="price">$${item.price}</p>
      </div>
      <button class="add-btn align-right" data-name="${item.name}" data-price="${item.price}">+</button>
  </section>
  `;
  });

  return menuHtml;
}

function handleAddToCart(name, price) {
  if (checkoutItems.length === 0) {
    // If this is the first item being added, show the checkout
    checkout.classList.remove("hidden");
  }
  checkoutItems.push({ id: uuidv4(), name, price });
  totalPrice += Number(price);
  checkoutList.innerHTML = renderCheckout(checkoutItems);
  totalPriceEl.innerText = totalPrice;
}

function handleRemoveFromCart(id, price) {
  checkoutItems = checkoutItems.filter(function (item) {
    return item.id !== id;
  });
  if (checkoutItems.length === 0) {
    // If user is removing the last item, hide the checkout section
    checkout.classList.add("hidden");
  }
  totalPrice -= Number(price);
  checkoutList.innerHTML = renderCheckout(checkoutItems);
  totalPriceEl.innerText = totalPrice;
}

function renderCheckout(items) {
  let checkoutHtml = "";
  items.forEach(function (item) {
    checkoutHtml += `
        <div class="checkout-item">
            <p class="checkout-item-name">${item.name}</p>
            <a href="#" class="remove-btn" data-remove-id="${item.id}" data-remove-price="${item.price}">remove</a>
            <p class="align-right checkout-item-price">$${item.price}</p>
        </div>`;
  });

  return checkoutHtml;
}

function pay(name) {
  paymentModal.classList.add("hidden");
  checkout.innerHTML = `
        <div class="thanks-notice">
            Thanks, ${name}! Your order is on its way!
        </div>
    `;
}
