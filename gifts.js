// HAMBURGER MENU
let burger = document.querySelector("#burger");
let menu = document.querySelector("#menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  menu.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});

menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    burger.classList.remove("open");
    menu.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }
});

// // ALL GIFTS
// async function allGifts() {
//     const url = "../gifts.json";
//     const allGiftContainer = document.querySelector("#all-gifts");
//     try {
//       const res = await fetch(url);
//       if (!res.ok) {
//         throw new Error(`Failed to fetch JSON: ${res.statusText}`);
//       }
//       const data = await res.json();
//       renderAllGifts(data, allGiftContainer);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function renderAllGifts(allGifts, container) {
//     const allGiftHTML = allGifts
//       .map((gift) => {
//         return `<div class="column-3 col">
//       <div class="img">
//         <img src="../images/gift-${gift.category
//           .split(" ")
//           .join("-")
//           .toLowerCase()}.png" alt="${gift.name}" />
//       </div>
//       <div class="description">
//         <h4 class="h-4" style="color: #4361ff">${gift.category}</h4>
//         <h3 class="h-3">${gift.name}</h3>
//       </div>
//     </div>`;
//       })
//       .join("");
//     container.innerHTML = allGiftHTML;
//   }

//   allGifts();

// CATEGORY GIFTS
// const categories = document.querySelectorAll(".category-name"); // Use plural for clarity

// categories.forEach(category => {  // Iterate over each category element
//     category.addEventListener("click", (event) => {  // Correct event handling
//         let output = "";
//         const categoryName = getCategorynName(event.target.textContent); // Use textContent and target

//         console.log(categoryName);

//         if(categoryName == 'For Work'){
//             allGifts.apply
//         }
//     });
// });

// function getCategorynName(categoryName) {
//     switch (categoryName) {
//         case "For Work":
//         case "For Health":
//         case "For Harmony":
//             // Return the category name; no need for separate output variable
//             return categoryName;
//         default:
//             return "Unknown Category"; // Handle cases where the category isn't recognized
//     }
// }

// Fetch and render categories
async function loadCategories() {
  try {
    const response = await fetch("../gifts.json");
    const categories = await response.json();

    renderCategoryCards(categories);
    displayAllItems(categories);
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
}

function renderCategoryCards(categories) {
  const categoryCardsContainer = document.getElementById("category-cards");

  const allCard = document.createElement("div");
  allCard.className = "category-card";
  allCard.textContent = "All Categories";
  allCard.dataset.index = "all";

  allCard.addEventListener("click", () => {
    document
      .querySelectorAll(".category-card")
      .forEach((card) => card.classList.remove("active"));
    allCard.classList.add("active");
    displayAllItems(categories);
  });

  categoryCardsContainer.appendChild(allCard);

  const uniqueCategories = [
    ...new Set(categories.map((item) => item.category)),
  ];
  uniqueCategories.forEach((category, index) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.textContent = category;
    card.dataset.index = index;

    card.addEventListener("click", () => {
      document
        .querySelectorAll(".category-card")
        .forEach((card) => card.classList.remove("active"));
      card.classList.add("active");
      displayCategoryItems(
        categories.filter((item) => item.category === category)
      );
    });

    categoryCardsContainer.appendChild(card);
  });
}

function displayCategoryItems(items) {
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = "";

  itemsContainer.innerHTML = items.map((item) => createCard(item)).join("");
}

function displayAllItems(categories) {
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = "";

  const allCards = categories.map((item) => createCard(item)).join("");
  itemsContainer.innerHTML = allCards;
}

function createCard(item) {
  const superpowers = Object.entries(item.superpowers)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join("");

  return `
      <div class="column-3 col">
        <div class="img">
          <img src="../images/gift-${item.category
            .split(" ")
            .join("-")
            .toLowerCase()}.png" alt="${item.name}" />
        </div>
        <div class="description">
          <h4 class="h-4" style="color: #4361ff">${item.category}</h4>
          <h3 class="h-3">${item.name}</h3>
        </div>
      </div>`;
}

loadCategories();

// TO TOP BUTTON
const button = document.getElementById("scrollToTopButton");

// Monitor scroll events
window.addEventListener("scroll", () => {
  // Check if user scrolled down 300px
  if (window.scrollY > 300) {
    button.style.display = "block";
  } else {
    button.style.display = "none"; 
  }
});

// Add click event to scroll to top
button.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling
  });
});
