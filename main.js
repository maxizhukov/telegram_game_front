
// Game
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let scoreCount = 0;
function flipCard() {
    scoreCount++;
    document.getElementById("score__now").innerHTML = "Turns:" + Math.floor(scoreCount/2);
    document.getElementById("score__result").innerHTML = "You have finished in" + " " + Math.floor(scoreCount/2) + "Steps";
    if (scoreCount <= 6) {
        document.getElementById("prize").innerHTML = "-20% for all menu";
    } else if (scoreCount > 6 && scoreCount <= 10) {
        document.getElementById("prize").innerHTML = "-15% for all menu";
    } else {
        document.getElementById("prize").innerHTML = "-10% for all menu";
    }
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    hasFlippedCard = false;
    secondCard = this;

    checkForMatching();
}

function checkForMatching() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? (disableCards(), endGame()) : unflipCards();

}
let count = 0;
function endGame() {
    count += 1;
    console.log(count);
    if (count === 6) {
        showPopup();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1300);
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard));

// POPUP

let popup = document.getElementById('popup');
let start = document.getElementById('start');

function hidePopup() {
    popup.style.opacity = "0"
    popup.style.visibility = "hidden"
}

start.addEventListener('click', hidePopup);

// Popup Endgame
let popupend = document.getElementById('popup__end');
function showPopup() {
    popupend.style.opacity = "1"
    popupend.style.visibility = "visible"
}

// Count for score









