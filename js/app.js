
//A list that holds all of the cards
let cards = ['fa-diamond',
             'fa-diamond',
             'fa-tree',
             'fa-tree',
             'fa-bug',
             'fa-bug',
             'fa-anchor',
             'fa-anchor',
             'fa-leaf',
             'fa-leaf',
             'fa-heart',
             'fa-heart',
             'fa-cloud',
             'fa-cloud',
             'fa-cogs',
             'fa-cogs'];


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

shuffle(cards);

// Create the deck
let deck = document.querySelector('.deck');
function createDeck(){
  for (let card of cards) {
    let liCard = document.createElement('li');
    let iCard = document.createElement('i');
    liCard.appendChild(iCard);
    deck.appendChild(liCard);
    liCard.classList.add('card');
    iCard.classList.add('fa',card);
  }
}

createDeck();

//counts the moves in the game
const moves = document.querySelector('.moves');
let movesNum = 0;
let starNum = 3;
function movesCounter(){
   movesNum += 1;
   moves.innerText = movesNum;
   if (movesNum === 15) {
     toggleStarFirst();
     starNum = 2;
   }
   if (movesNum === 25) {
     toggleStarLast();
     starNum = 1;
   }
}

//Show/hide first star
 const listStars = document.querySelector('.stars');
 let firstStar = listStars.firstElementChild.firstElementChild;
 let lastStar = listStars.lastElementChild.firstElementChild;

 function toggleStarFirst(){
   firstStar.classList.toggle('hide');
 }

 //Show/hide last star
 function toggleStarLast(){
   lastStar.classList.toggle('hide');
 }

//Timer function that starts with the first click on the cards
const timer = document.querySelector(".timer");
let timerOff = true;
let seconds = 0;
let minutes = 0;
let interval;
function startTimer(){
  interval = setInterval(function(){
      seconds++;
      if (seconds < 10 ) {
        timer.innerHTML = minutes+":0"+seconds;
      } else {
        timer.innerHTML = minutes+":"+seconds;
      }
      if(seconds == 59){
          minutes++;
          seconds = -1;
      }
  },1000);
  timerOff = false;
}


//Checks if the opened card are matched and closes them if not
let matchCounter = 0;

function checkMatch() {
   if (openCardsSymbol[0] === openCardsSymbol[1]) {
     openCards[0].className = 'card match';
     openCards[1].className = 'card match';
     openCards = [];
     openCardsSymbol = [];
     matchCounter ++;
     if (matchCounter === 8) {
       gameWin();
     }
   } else {
     setTimeout(function(){
       openCards[0].className = 'card';
       openCards[1].className = 'card';
       openCards = [];
       openCardsSymbol = [];
     }, 600);
   }
}

//Resets the game board
function resetsBoard(){
  let i = 0;
  shuffle(cards);
  cardys.forEach(function(cardy) {
    cardy.className = 'card';
    cardy.firstElementChild.className = 'fa ' + cards[i];
    i++;
  });

}

//Resets the timer
function resetTimer(){
  timer.innerHTML = "0:00";
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  timerOff = true;
}

//Resets moves
function resetMoves(){
  movesNum = 0;
  moves.innerText = movesNum;
  matchCounter = 0;
}


//Resets star rating
function resetStars(){
   if (starNum === 2 ) {
     toggleStarFirst();
   }
   if (starNum === 1){
     toggleStarFirst();
     toggleStarLast();
     }
   starNum = 3;
}

//Resets the whole game
function resetGame(){
  resetsBoard();
  resetStars();
  resetMoves();
  resetTimer();
}

//toggle popup window
function togglePopup(){
  const popup = document.querySelector('.popup');
  popup.classList.toggle('hide');
}



//Ends the game when all the matched card are found
function gameWin() {
  togglePopup();
  clearInterval(interval);

  //adds the number of moves and the time that took to win the game in the popup window
  document.querySelector('.final-moves').innerHTML = 'You made ' + movesNum + ' moves';
  document.querySelector('.final-time').innerHTML = 'It took you ' + minutes + ' minutes and ' + seconds + ' seconds' ;

  // adds the star rating to the popup window
  let copyListStars = listStars.cloneNode(true);
  document.querySelector('.final-stars').appendChild(copyListStars);
}

//Main part of the code
 let cardys = document.querySelectorAll('.card');
 let openCards = [];
 let openCardsSymbol = [];
 const restart = document.querySelector('.restart');

 //Restart game button
 restart.addEventListener('click', function(){
   resetGame();
 });

 //closes the pop up window by clicking the X
 let close = document.querySelector('.close');
 close.addEventListener('click', function(){
   togglePopup();
   document.querySelector('.final-stars').innerHTML='';
 });

 //play again button
 const playAgain = document.querySelector('.again');
 playAgain.addEventListener('click', function(){
   resetGame();
   togglePopup();
   document.querySelector('.final-stars').innerHTML='';
 });

//Event listener added to the cards that starts the game with a click
 cardys.forEach(function(cardy) {
   cardy.addEventListener('click', function(e){
     if (timerOff) {
       startTimer();
     }
     if (e.target.className !== 'card match') {
       openCards.push(e.target);
       openCardsSymbol.push(e.target.firstElementChild.className);
       if (openCards.length <= 2) {
          cardy.classList.add('open','show');
          if (openCards.length === 2) {
            if (openCards[0] !== openCards[1]){
              movesCounter();
              checkMatch();
            } else {
              openCards.pop();
              openCardsSymbol.pop();
            }
          }
       }
     }
   });
 });
