/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-diamond","fa-bolt","fa-cube","fa-leaf","fa-bomb","fa-bicycle","fa-paper-plane-o","fa-anchor","fa-diamond","fa-bolt","fa-cube","fa-leaf","fa-bomb","fa-bicycle","fa-paper-plane-o","fa-anchor"];
var openCards = [];
var moveCount = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var resetButton = document.querySelector(".restart");
resetButton.addEventListener("click", function(){
	console.log("Click Restart!");
	var shuffledCards = shuffle(cards);
	var newDeck = document.createElement("ul");
	newDeck.className = "deck";
	shuffledCards.forEach(function(item){
		var cardListItem = document.createElement("li");
		cardListItem.className = "card";
		var iTag = document.createElement("i");
		iTag.className = "fa " + item;
		cardListItem.appendChild(iTag);
		newDeck.appendChild(cardListItem);
		cardListItem.addEventListener("click",function(){
			if(this.classList.contains("open"))
			{
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

function addMoveCount()
{
	moveCount++;
	document.querySelector(".moves").innerText = moveCount;
}

function resetMoveCount()
{
	var moves = document.querySelector(".moves");
	moveCount = 0;
	moves.innerText = 0;
}

function openCard(card)
{
	card.className += " open show";
	openCards.push(card);
	if(moveCount % 2 == 0)
	{
		checkOpenCards();
	}
}

function resetGame()
{
	resetMoveCount();
	openCards.length = 0;
}

function checkOpenCards()
{
	var card1 = openCards.pop();
	var card2 = openCards.pop();
	if(card1.querySelector("i").className == card2.querySelector("i").className)
	{
		card1.className = "card match";
		card2.className = "card match";
	}
	else
	{
		setTimeout(function(){
			card1.className = "card";
			card2.className = "card";
		},700);
	}
}

resetButton.click();
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
