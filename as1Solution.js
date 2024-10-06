"use strict";

//**Moving to question 1 */
let counter1 = 0;
let counter2 = 0;
let limit = 5;

//? event Listensers
document.getElementById("playto").addEventListener("change", setLimit);
document.getElementById("p1Button").addEventListener("click", addLap1);
document.getElementById("p2Button").addEventListener("click", addLap2);
document.getElementById("reset").addEventListener("click", resetCounters);

//? for setting a limit on laps
function setLimit() {
  limit = document.getElementById("playto").value;
}

//? for adding Lap to player1
function addLap1() {
  document.getElementById("p1Display").innerText = ++counter1;
  isFirstWinner();
}

//? for adding lap to player2
function addLap2() {
  document.getElementById("p2Display").innerText = ++counter2;
  isSecondWinner();
}

//? for checking whether player1 is winner or not
function isFirstWinner() {
  if (counter1 >= limit) declareWinnerChanges("p1Display", "p2Display");
}

//? for checking whether player2 is winner or not
function isSecondWinner() {
  if (counter2 >= limit) declareWinnerChanges("p2Display", "p1Display");
}

//? for declare winners
function declareWinnerChanges(winner, loser) {
  document.getElementById(winner).style.color = "green";
  document.getElementById(loser).style.color = "red";
  document.getElementById("p1Button").disabled = true;
  document.getElementById("p2Button").disabled = true;
}

//? for setting a resetCounters
function resetCounters() {
  counter1 = 0;
  counter2 = 0;
  let displayCounter1 = document.getElementById("p1Display");
  let displayCounter2 = document.getElementById("p2Display");
  displayCounter1.style.color = "initial";
  displayCounter2.style.color = "initial";
  displayCounter1.innerText = 0;
  displayCounter2.innerText = 0;

  document.getElementById("p1Button").disabled = false;
  document.getElementById("p2Button").disabled = false;
}

//** Moving to question 2 */

let itemsAndPrices = {
  "Cherry Tomatoes": 5,
  "Savoy Cabbage": 4,
  "Green Beans": 6,
  "Yellow Peppers": 3,
  "Salad Mix": 4,
  Grapes: 3,
  Oranges: 5,
};

let addBtn = document.getElementById("addbtn");

addBtn.addEventListener("click", () => {
  let textBox = document.getElementById("item");
  let selectionList = document.getElementById("produceList");
  let produceItem = textBox.value.trim();

  if (produceItem === "") {
    alert("Please enter a valid produce item.");
    return;
  }
  for (let i = 0; i < selectionList.options.length; i++) {
    if (selectionList.options[i].text === produceItem) {
      alert("This item is already in the list. Please enter a new item.");
      return;
    }
  }

  //creating a new element
  let newOptionItem = document.createElement("option");
  newOptionItem.className = "option";
  newOptionItem.text = produceItem;
  newOptionItem.value = 1;
  selectionList.appendChild(newOptionItem);
  textBox.value = "";
});

let removeBtn = document.getElementById("removebtn");
removeBtn.addEventListener("click", () => {
  let select = document.getElementById("produceList");

  if (select.childElementCount !== 0 && select.selectedIndex !== -1) {
    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption) {
      select.remove(select.selectedIndex);
    }
  } else {
    alert("Either no children to remove or nothing selected");
  }
});

let inputProduceWeight = document.getElementById("produceWeight");
inputProduceWeight.addEventListener("blur", () => {
  let select = document.getElementById("produceList");
  if (select.childElementCount !== 0 && select.selectedIndex !== -1) {
    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption) {
      selectedOption.value = inputProduceWeight.value
        ? inputProduceWeight.value
        : 1;
      inputProduceWeight.value = "";
    }
  } else {
    alert("Either no children to remove or nothing selected");
  }
});

document.getElementById("totalAmount").addEventListener("focus", function () {
  const produceList = document.getElementById("produceList");
  let totalAmount = 0;

  for (let i = 0; i < produceList.options.length; i++) {
    const produceItem = produceList.options[i].text;
    const weight = parseFloat(produceList.options[i].value);
    const pricePerPound = itemsAndPrices[produceItem] || 5;

    totalAmount += weight * pricePerPound;
  }

  document.getElementById("totalAmount").value = totalAmount.toFixed(2);
});

//** Moving to question 3 */
// ? data from inpiration quotes file
let inspirationQuotes = [
  "Life isn't about finding yourself. Life is about creating yourself. - George Bernard Shaw",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt",
  "There is no greater agony than bearing an untold story inside you. - Maya Angelou",
  "I have not failed. I've just found 10,000 ways that won't work. - Thomas A. Edison",
  "We accept the love we think we deserve. - Stephen Chbosky",
  "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi",
  "No one can make you feel inferior without your consent. - Eleanor Roosevelt",
  "Be yourself; everyone else is already taken. - Oscar Wilde",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston S. Churchill",
  "If my life is going to mean anything, I have to live it myself. - Rick Riordan",
  "Isn't it nice to think that tomorrow is a new day with no mistakes in it yet? - L.M. Montgomery",
  "You can't stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes. - A.A. Milne",
  "Pain is inevitable. Suffering is optional. - Haruki Murakami",
  "Always do what you are afraid to do. - Ralph Waldo Emerson",
  "Our lives begin to end the day we become silent about things that matter. - Martin Luther King Jr.",
  "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
  "Talent hits a target no one else can hit. Genius hits a target no one else can see. - Arthur Schopenhauer",
  "The mind is its own place, and in itself can make a heaven of hell, a hell of heaven.. - John Milton",
  "Fantasy is hardly an escape from reality. It's a way of understanding it. - Lloyd Alexander",
  "Waiting is painful. Forgetting is painful. But not knowing which to do is the worst kind of suffering. - Paulo Coelho",
  "Do not go where the path may lead, go instead where there is no path and leave a trail. - Ralph Waldo Emerson",
  "I can be changed by what happens to me. But I refuse to be reduced by it. - Maya Angelou",
  "Never let your sense of morals prevent you from doing what is right. - Isaac Asimov",
  "Hell is empty and all the devils are here. - William Shakespeare",
  "Turn your wounds into wisdom. - Oprah Winfrey",
];

//? changing the inspiration quotes randomly
function changeQuotes() {
  let max = inspirationQuotes.length;
  let label = document.getElementById("displayQuotes");
  let index1 = Math.floor(Math.random() * max);
  let index2 = Math.floor(Math.random() * max);
  let index3 = Math.floor(Math.random() * max);
  let index4 = Math.floor(Math.random() * max);
  label.innerHTML =
    inspirationQuotes[index1] +
    `<br/>` +
    inspirationQuotes[index2] +
    `<br/>` +
    inspirationQuotes[index3] +
    `<br/>` +
    inspirationQuotes[index4];
}

//? setInterval for inspirational quotes
setInterval(changeQuotes, 1000);

//** Moving to question 4 */
//? for keeping the things ready for slideshow
function getSlideShowFunction() {
  let slideImageIndex = 0;
  let captionIndex = 0;
  let slide = document.getElementById("slide");
  let slides = document.getElementById("slides");
  let caption = document.getElementById("caption");
  return function () {
    if (slideImageIndex >= slides.children.length) {
      slideImageIndex = 0;
    }

    if (captionIndex >= slides.children.length) {
      captionIndex = 0;
    }

    caption.innerText = slides.children[captionIndex].alt;
    slide.src = slides.children[slideImageIndex].src;

    captionIndex >= slides.children.length
      ? (captionIndex = 0)
      : captionIndex++;
    slideImageIndex >= slides.children.length
      ? (slideImageIndex = 0)
      : slideImageIndex++;
  };
}

//? getting function to perform actual slideshow
let slideShow = getSlideShowFunction();

//? setInterval to perform actual slideshow
setInterval(slideShow, 2000);
