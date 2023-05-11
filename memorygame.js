const gameCont = document.getElementById('game');
// const randomColorsApp = setInterval(randomColors, 1000);
let bestScore ;
let score = 0;
let flippedCards = 0;
let playing = false;

let scoreText = document.querySelector("#final-score");
let bestText = document.querySelector(".best");

const COLORS = [
    "red",
    "green",
    "black",
    "grey",
    "blue",
    "white",
    "red",
    "green",
    "black",
    "grey",
    "blue",
    "white"
 ];

let firstCard;
let secondCard;
let delay = false;

function shuffle(array){
    let count = array.length;
    while(count > 0){
        let index = Math.floor(Math.random() * count);
        count --;

        let temp = array[count];
        array[count] = array[index];
        array[index] = temp;
    }
    return array;
}
    
let shuffledColors = shuffle(COLORS);

function creatingColorDiv(colorArray){
    console.log("create div")
    for (let color of colorArray){
        const colorDiv = document.createElement('div');
            
        colorDiv.classList.add(color);
        colorDiv.addEventListener('click', handleCardClick);

        gameCont.append(colorDiv);
        console.log('gameCont is ', gameCont);
     }

    scoreText.textContent = 0;
    bestText.textContent = bestScore? bestScore: "-";
}
// beginning the game
function start(){
    console.log("Game should start here")
    score = 0;
    flippedCards = 0;
    scoreText.textContent = 0;
    bestScore = localStorage.getItem("best");
    bestText.textContent = bestScore? bestScore: "-";

    shuffledColors = shuffle(COLORS);
    // document.querySelector("#game").innerHTML = '';
    creatingColorDiv(shuffledColors);
}
// resetting selected cards
function reset(){
    firstCard.style.backgroundColor = '';
    secondCard.style.backgroundColor = '';
    firstCard = null;
    secondCard = null;
    delay = false;
}

function handleCardClick(event){
    if(delay) return;

    if(playing === false) return;

    if(!firstCard){
        firstCard = event.target;
        firstCard.style.backgroundColor = firstCard.classList[0];
    }
    else{
        if(firstCard === event.target)
         return;
        score++;
        scoreText.textContent = score;
        secondCard = event.target;
        console.log('this is second card', secondCard);
        secondCard.style.backgroundColor = secondCard.classList[0];

        delay = true;

            // color match
        if(firstCard.classList[0] == secondCard.classList[0]){
            flippedCards++;
            firstCard.removeEventListener('click', handleCardClick);
            secondCard.removeEventListener('click', handleCardClick);
            firstCard = null;
            secondCard = null;
            delay = false;
        }
        else{
            setTimeout(reset,1000);
        }
        if(flippedCards === COLORS.length/2){
            setTimeout(alert,500, "YOU WON! CONGRATS!")
            if (score < bestScore || !bestScore){
                localStorage.setItem('best', score);
            }
            button.value = "Play Again?"
        }
    }
}
// when DOM loads
// function randomColors(){
//     start();
//     cards = document.querySelectorAll("#game div");
//     for(let card of cards){
//         card.style.backgroundColor = card.classList[0];
//     }
// }

// start();

let button = document.querySelector("#start-btn")
button.addEventListener("click", function() {
//   clearInterval(randomColorsApp);
  button.value = "Reset?";
  playing = true;
  gameCont.innerHTML = '';
  start();
});