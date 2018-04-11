/*
 * Create a list that holds all of your cards
 */

const cards = document.querySelectorAll('.card');

// converted cardsObj into cardsArr in order to use it in 'shuffle' function
const cardsArr = Object.keys(cards).map(function (key) { return cards[key]; });

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
// loop through cardsArr and update HTML content
function updateDeck () {
  shuffledDeck = [];
  for (let i = 0; i < cardsArr.length; i++) {
    shuffledDeck.push(cardsArr[i].innerHTML)
  }

  for (let i = 0; i < cardsArr.length; i++) {
    cards[i].innerHTML = shuffledDeck[i];
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

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

const cardsUl = document.querySelector('.deck');
cardsUl.addEventListener('click', function(event) {
  clickCounter++;
  if (clickCounter == 1) {
    timerInterval = setInterval(function () {
      startTimer();
    }, 1000);
  }
  pageClickCounter.textContent = clickCounter;
  displaySymbol();
  if (clickCounter < 26) {}
});

// display card's symbol

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

// add the card to the list of displayed

function addToDisplayedArr() {
  if (event.target.tagName == 'LI') {
    openedCards.push(event.target.firstElementChild);
  } else if (event.target.tagName == 'I') {
    openedCards.push(event.target);
  }
}


// check if cards match
function checkMatch(arr) {

  if (arr[0].className == arr[1].className) {
    arr[0].parentNode.setAttribute('class', 'card match');
    arr[1].parentNode.setAttribute('class', 'card match');
    matchedCards++
    if (matchedCards == 8) {
      stopTimer();
      alert('you won the game');
    }
    openedCards = [];
  } else {
    arr[0].parentNode.setAttribute('class', 'card');
    arr[1].parentNode.setAttribute('class', 'card');
    openedCards = [];
  }
}



// timer functions by udacity user 'pawel.kopycki8spg'
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
            openPopup();
            stopTimer();
        }

    }

 /* this function will be used in the resetGame function.
  * this function puts all cards into initial state(which is reverse)
  * it is done by changing each card's class attribute
  */
 function reverseCards () {
   const cards = document.querySelectorAll('.card');
   for (let i = 0; i < cards.length; i++) {
     cards[i].setAttribute('class', 'card');
   }
 }

/* eventListener for restart button */
 const restartButton = document.querySelector('.restart');
 const restartButtonListener = restartButton.addEventListener('click', function() {
  stopTimer();
	shuffleDeck();
  clickCounter = 0;
  pageClickCounter.textContent = clickCounter;
});
