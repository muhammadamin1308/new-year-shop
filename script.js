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
// SLIDER
let slider = document.querySelector(".slider-container");
backBtn = document.querySelector("#back-btn");
nextBtn = document.querySelector("#next-btn");

nextBtn.addEventListener("click", () => {
  slider.computedStyleMap.scrollBehavior = "smooth";
  slider.scrollLeft += 200;
});

backBtn.addEventListener("click", () => {
  slider.computedStyleMap.scrollBehavior = "smooth";
  slider.scrollLeft -= 200;
});

// TIMER

function timer() {
  let newYear = new Date("Jan 1, 2026 00:00:00").getTime();
  let now = new Date().getTime();
  let distance = newYear - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(timer, 1000);
timer();

// RANDOM GIFTS
async function randomGift() {
  const url = "../gifts.json";
  const bestGiftContainer = document.querySelector("#best-gifts");
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch JSON: ${res.statusText}`);
    }
    const data = await res.json();
    const randomGifts = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      randomGifts.push(data.splice(randomIndex, 1)[0]);
    }
    renderRandomGifts(randomGifts, bestGiftContainer);
  } catch (error) {
    console.error(error);
  }
}

function renderRandomGifts(randomGifts, container) {
  const giftHTML = randomGifts
    .map((gift) => {
      return `<div class="column-3 col">
    <div class="img">
      <img src="../images/gift-${gift.category
        .split(" ")
        .join("-")
        .toLowerCase()}.png" alt="" />
    </div>
    <div class="description">
      <h4 class="h-4" style="color: #4361ff">${gift.category}</h4>
      <h3 class="h-3">${gift.name}</h3>
    </div>
  </div>`;
    })
    .join("");
  container.innerHTML = giftHTML;
}

randomGift();

