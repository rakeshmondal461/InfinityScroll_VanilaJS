const cards = document.querySelectorAll(".card");
const options = {
  root: null,
  threshold: 0.8,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
};

const observer = new IntersectionObserver(callback, options);

cards.forEach((card) => {
  observer.observe(card);
});

const lastCardCallback = (entries, observer) => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  loadNewCards();
  observer.unobserve(lastCard.target);
  observer.observe(document.querySelector(".card:last-child"));
};

const lastCardObserver = new IntersectionObserver(lastCardCallback, {
  threshold: 0.8,
});

lastCardObserver.observe(document.querySelector(".card:last-child"));

function loadNewCards() {
  const cardConatainer = document.querySelector(".card-container");

  for (let index = 0; index < 10; index++) {
    const newEl = document.createElement("div");
    newEl.classList.add("card");
    newEl.textContent = "This is a card";
    observer.observe(newEl);
    cardConatainer.append(newEl);
  }
}
