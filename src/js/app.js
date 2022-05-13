const API_URL = "https://api.quotable.io/random";
const quoteCon = document.querySelector(".quote-text");
const quoteInput = document.querySelector(".quote-area");
const renderBtn = document.querySelector(".btn");
const timer = document.querySelector(".time");
const statsCon = document.querySelector(".stats");

renderBtn.addEventListener("click", () => {
  getQuote();
  renderNewQuote();
  startTimer();
  quoteInput.value = null
});

quoteInput.addEventListener("input", () => {
  const inputContent = quoteInput.value.split("");
  const quoteContent = document.querySelectorAll("span");

//   if (quoteContent.length === inputContent.length) {
//     timer.textContent = getTimerTime().value;
//   }

  quoteContent.forEach((charspan, index) => {
    const char = inputContent[index];

    if (char == null) {
      charspan.classList.remove("correct");
      charspan.classList.remove("incorrect");
    }else if (char === charspan.innerText) {
      charspan.classList.add("correct");
      charspan.classList.remove("incorrect");
    } else {
      charspan.classList.add("incorrect");
      charspan.classList.remove("correct");
    }
  });
});

function getQuote() {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getQuote();
  quoteCon.innerText = "";
  quote.split("").forEach((char) => {
    const charspan = document.createElement("span");
    charspan.innerText = char;
    quoteCon.appendChild(charspan);
  });
}

let startTime;
function startTimer() {
  timer.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
