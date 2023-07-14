const cards = document.querySelectorAll(".card");

let card = [];
let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timerInterval;
let Time = 0;
let score = 0;

function startTimer() {
  timerInterval = setInterval(function() {
    Time++;
    // Update the timer display in your UI
    document.getElementById('time-remaining').textContent = formatTime(Time);
    if(Time >= 61){
        clearInterval(timerInterval);
        gameOver();
    }
  }, 1000);
}

// Function to format the time in MM:SS format
function formatTime(timeInSeconds) {
  const seconds = timeInSeconds % 60;
  return `${seconds.toString().padStart(2, '0')}`;
}

function flipCard(e){
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disableDeck) {
         clickedCard.classList.add("flip");
         
         if(!cardOne){
            return cardOne = clickedCard;
         }
         
         cardTwo = clickedCard;
         
        
         disableDeck = true;
         
         let cardOneImg = cardOne.querySelector("img").src,
         cardTwoImg = cardTwo.querySelector("img").src;
         matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
   if(img1 === img2) {
     matchedCard++;
     score++;
         document.getElementById('score').textContent = score;
     if(matchedCard == 8){
        clearInterval(timerInterval);
        gameOver();
     }
     if(matchedCard == 8){
        setTimeout(() => {
            return shuffleCard();
        }, 1200);
        
     }
     cardOne.removeEventListener("click", flipCard);
     cardTwo.removeEventListener("click", flipCard);
     cardOne = cardTwo = "";
     return disableDeck = false;;
    }

   setTimeout(() => {

   cardOne.classList.add("shake");
   cardTwo.classList.add("shake");
   }, 400);

   setTimeout(() => {

    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
   }, 1200);
}

function gameOver() {
    console.log("Game Over");

    const restart = confirm("Game Over! Refresh to Restart");
}


function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 16);
        card.style.order = ramdomPos;
      });
              
    
    cards.forEach((card, index)=> {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);

       
    });
}
startTimer();
shuffleCard();
cards.forEach(card => {
    card.addEventListener("click", flipCard);
    //card.classList.add("flip");
});