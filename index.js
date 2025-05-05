/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // create a new div element, which will become the game card
        const newDiv = document.createElement('div');
        // add the class game-card to the list
        newDiv.classList.add("game-card"); 
        
        // set the inner HTML using a template literal to display some info 
        // about each game
        
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        newDiv.innerHTML = `
        <div class = "games" >
            <img src= "${games[i].img}" alt="game image" class="game-img" />
            <h1>Name: ${games[i].name} </h1>
            <h3>Description: ${games[i].description} </h3>
            <h2>Backers: ${games[i].backers} </h2>
        </div>`;

        // append the game to the games-container
        gamesContainer.appendChild(newDiv);
        
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
console.log("before update:", contributionsCard.textContent);
console.log("GAMES_JSON:", GAMES_JSON);

// use reduce() to count the number of total contributions by summing the backers
const backerContribute = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

console.log("after update:", backerContribute);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.textContent = `${backerContribute.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const moneytotal = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.textContent = `$${moneytotal.toLocaleString()}`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const gameTotal = GAMES_JSON.reduce((game) => {
    return game + 1;
}, 0);

gamesCard.textContent = `${gameTotal.toLocaleString()}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const goalNotMet = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    console.log("unfunded games: ", goalNotMet);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(goalNotMet);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const goalMet = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    console.log("Funded games: ", goalMet);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(goalMet);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    const gameAll = GAMES_JSON.filter((game) => {
        return game.goal >= game.pledged || game.goal <= game.pledged;
    });
    console.log("All games: ", gameAll);
    addGamesToPage(gameAll);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const countGame = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);
console.log("Number of Games: ", countGame);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = countGame === 0
? `all games have been funded! That is amazing thank you for all your help everyone!`
: `A total of $${moneytotal.toLocaleString()} has been raised for ${gameTotal.toLocaleString()} games and currently there are ${countGame}
that still need to reach their goal. We need your help to fund these amazing games!`;
// create a new DOM element containing the template string and append it to the description container
const newMessage = document.createElement("p");
newMessage.textContent = displayStr;
descriptionContainer.appendChild(newMessage);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [fgame, sgame, ...othergame] = GAMES_JSON;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topname = document.createElement("p");
topname.textContent = fgame.name;
firstGameContainer.appendChild(topname);

// do the same for the runner up item
const secname = document.createElement("p");
secname.textContent = sgame.name;
secondGameContainer.appendChild(secname);