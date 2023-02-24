import { menuArray } from "./data.js";
const menu = document.getElementById("menu");

menu.innerHTML = renderMenu(menuArray);

function renderMenu(menu) {
  let menuHtml = "";

  menu.forEach(function (item) {
    let ingredients = "";
    item.ingredients.forEach(function (ingredient, index) {
      ingredients += ingredient;
      if (item.ingredients.length - 1 > index) {
        // If NOT last item in array
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
      <button class="add-btn align-right">+</button>
  </section>
  `;
  });

  return menuHtml;
}
