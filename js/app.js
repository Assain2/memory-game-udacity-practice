window.onload = function() {
  shuffleDeck();
};

// List of cards
const cards = document.querySelectorAll('.card');

// Stars initial html
const initialStarsNumber = "<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li>"

// Converted cardsObj into cardsArr in order to use it in 'shuffle' function
const cardsArr = Object.keys(cards).map(function (key) { return cards[key]; });


/*
 * this function puts all cards into initial state(which is reverse)
 * it is done by changing each card's class attribute
 */


function reverseCards () {
  const cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++) {
      cards[i].setAttribute('class', 'card');
  }
}

// EventListener for restart button
const restartButton = document.querySelector('.restart');
const restartButtonListener = restartButton.addEventListener('click', function() {
  clickCounter = 0;
  stopTimer();
  shuffleDeck();
  pageClickCounter.textContent = clickCounter;
  starDiv.innerHTML = initialStarsNumber;
 });


function shuffleDeck () {
  reverseCards();
  shuffle(cardsArr);
  updateDeck();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

// Loop through cardsArr and update HTML content
function updateDeck () {
  shuffledDeck = [];
  for (let i = 0; i < cardsArr.length; i++) {
    shuffledDeck.push(cardsArr[i].innerHTML)
  }

  for (let i = 0; i < cardsArr.length; i++) {
    cards[i].innerHTML = shuffledDeck[i];
  }
}

let openedCards = [];
let matchedCards = 0;
let clickCounter = 0;
let startTime;
let endTime;
let timerInterval;
let timerCounter = 0;
let timerMin = 0;
let pageClickCounter = document.querySelector('.moves');
let pageTimer = document.querySelector('.timer');
let starDiv = document.querySelector('.stars');


const cardsUl = document.querySelector('.deck');
cardsUl.addEventListener('click', function(event) {
  if (event.target.tagName == 'LI' && event.target.className == 'card') {
    clickCounter++;
  }

  if (clickCounter == 1 && event.target.className == 'card') {
      timerInterval = setInterval(function () {
        startTimer();
      }, 1000);
  }

  pageClickCounter.textContent = clickCounter;
  displaySymbol();
  if (clickCounter == 27) {
      removeStar();
  } else if (clickCounter == 47) {
      removeStar();
  }

});

// Display card's symbol
function displaySymbol() {
  if (event.target.tagName == 'LI' && event.target.className == 'card') {
      event.target.setAttribute('class', 'card show open');
      addToDisplayedArr();
      if (openedCards.length === 2) {
          setTimeout('checkMatch(openedCards);', 300);
      }

  } else if (event.target.tagName == 'I' && event.target.parentNode.className == 'card') {
      event.target.parentNode.setAttribute('class', 'card show open');
      addToDisplayedArr();
      if (openedCards.length === 2) {
          setTimeout('checkMatch(openedCards);', 300);
        }
      }
}

// Add the card to the list of displayed
function addToDisplayedArr() {
  if (event.target.tagName == 'LI') {
    openedCards.push(event.target.firstElementChild);
  } else if (event.target.tagName == 'I') {
    openedCards.push(event.target);
  }
}


// Check if cards match
function checkMatch(arr) {

  if (arr[0].className == arr[1].className) {
    arr[0].parentNode.setAttribute('class', 'card match');
    arr[1].parentNode.setAttribute('class', 'card match');
    matchedCards++
    if (matchedCards == 8) {
      updateModal();
      finalTime.textContent = document.querySelector('.timer').innerHTML;
      stopTimer();
      showModal();
    }
    openedCards = [];
  } else {
    arr[0].parentNode.setAttribute('class', 'card');
    arr[1].parentNode.setAttribute('class', 'card');
    openedCards = [];
  }
}


// Timer functions by udacity user 'pawel.kopycki8spg'
function startTimer() {
  let sec;
  timerCounter++
  sec = timerCounter;
  if (timerCounter === 60) {
    timerMin++;
    sec = 0;
    timerCounter = 0;
  }
document.querySelector('.timer').innerHTML = addZeroToTimer(timerMin) + ':' + addZeroToTimer(sec);
}

function addZeroToTimer(number) {
  if (number < 10) {
    return '0' + number;
  } else {
    return number;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerCounter = 0;
  timerMin = 0;
  document.querySelector('.timer').innerHTML = '00:00';
}

function timeOfGame() {

// Start game
  if (clickCounter === 1) {
      startTime = Date.now();
  }

// End game
  if (matchedCards.length === 8) {
      endTime = Date.now() - startTime;
      stopTimer();
  }
}


// Star rating functionality
function removeStar() {
  starDiv = document.querySelector('.stars');
  const smallStar = starDiv.firstElementChild;
  starDiv.removeChild(smallStar);
}


// Modal element selectors
const modal = document.querySelector('.modal');
const newGameButton = document.querySelector('.new-game');
const finalMoves = document.querySelector('.moves-info');
const finalTime = document.querySelector('.time-info');
const finalStars = document.querySelector('.star-info');


// Update score to showModal
function updateModal() {
  finalMoves.textContent = clickCounter;
  finalTime.textContent = pageTimer.textContent;
  finalStars.innerHTML = starDiv.innerHTML;
}


// Show modal function
function showModal() {
  modal.setAttribute('style', 'display: block');
}


// Hide modal function
function hideModal() {
  modal.setAttribute('style', 'display: none');
}


// EventListener for newGameButton
const newGameButtonListener = newGameButton.addEventListener('click', function() {
  location.reload();
});
