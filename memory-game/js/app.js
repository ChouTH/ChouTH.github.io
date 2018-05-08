var cards = ["fa-diamond", "fa-bolt", "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle", "fa-paper-plane-o", "fa-anchor", "fa-diamond", "fa-bolt", "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle", "fa-paper-plane-o", "fa-anchor"];
var openCards = [];
var moveCount = 0;

var resetButton = document.querySelector(".restart");
resetButton.addEventListener("click", function () {
	console.log("Click Restart!");
	var shuffledCards = shuffle(cards);
	var newDeck = document.createElement("div");
	newDeck.className = "deck";
	shuffledCards.forEach(function (item) {
		var card = document.createElement("div");
		card.className = "card";
		card.innerHTML = `
		<div class="front">
		  <i class="fa ${item}"></i>
		</div>
		<div class="back fa"></div>`;
		newDeck.appendChild(card);
		card.addEventListener("click", function () {
			if (this.classList.contains("open")) {
				console.log('Click open card');
				return;
			}
			addMoveCount();
			openCard(this);
		});
	});
	var container = document.querySelector(".container");
	var oldDeck = document.querySelector(".container .deck");
	container.replaceChild(newDeck, oldDeck);
	resetGame();
});

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

function addMoveCount() {
	moveCount++;
	document.querySelector(".moves").innerText = moveCount;
}

function resetMoveCount() {
	var moves = document.querySelector(".moves");
	moveCount = 0;
	moves.innerText = 0;
}

function openCard(card) {
	card.className += " open show";
	openCards.push(card);
	if (moveCount % 2 == 0) {
		checkOpenCards();
	}
}

function resetGame() {
	resetMoveCount();
	openCards.length = 0;
}

function checkOpenCards() {
	var card1 = openCards.pop();
	var card2 = openCards.pop();
	if (card1.querySelector("i").className == card2.querySelector("i").className) {
		card1.className = "card match open";
		card2.className = "card match open";
	}
	else {
		setTimeout(function () {
			card1.className = "card";
			card2.className = "card";
		}, 500);
	}
}

function initGame() {
	resetButton.click();

	var cards = document.querySelectorAll('.deck .card');
	var delay = 1000;
	cards.forEach(function (card) {

		setTimeout(function () {
			card.classList = 'card show open';
		}, delay);

		setTimeout(function () {
			card.classList = 'card';
		}, delay + 600);

		delay += 250;
	});
}

initGame();