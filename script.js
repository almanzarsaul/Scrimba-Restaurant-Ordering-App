import { menuArray } from "./data.js";
const menu = document.getElementById("menu");
const checkout = document.getElementById("checkout-items");
const totalPriceEl = document.getElementById("total-price");

let checkoutItems = [];
let totalPrice = 0;

totalPriceEl.innerText = totalPrice;

menu.innerHTML = renderMenu(menuArray);
menu.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-btn")) {
    handleAddToCart(event.target.dataset.name, event.target.dataset.price);
  }
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
  checkoutItems.push({ name, price });
  totalPrice += Number(price);
  checkout.innerHTML = renderCheckout(checkoutItems);
  totalPriceEl.innerText = totalPrice;
}

function handleRemoveFromCart() {}

function renderCheckout(items) {
  let checkoutHtml = "";
  items.forEach(function (item) {
    checkoutHtml += `
        <div class="checkout-item">
            <p>${item.name}</p>
            <a href="">remove</a>
            <p class="align-right">$${item.price}</p>
        </div>`;
  });

  return checkoutHtml;
}
