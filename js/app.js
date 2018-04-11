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

let firstCard;
let secondCard;
let clickCounter = 0;
const cardsUl = document.querySelector('.deck');
cardsUl.addEventListener('click', function(event) {
   console.log(event.target);
   displaySymbol();
})

function displaySymbol() {
  event.target.setAttribute('class', 'card show open');
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
	shuffleDeck();
});
