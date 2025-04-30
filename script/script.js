// Initialize a variable to track the total clicks
var total = 0;
var skillPoints = 0; // Initialize skill points
var clickPower = 1; // Initial click power
var upgradeCost = 20; // Cost of the upgrade
var autoclickCost = 50; // Cost of the second upgrade
var autoclickFlag = false; // Flag for the second upgrade
var autoclickPower = 0; // Power of the autoclicker
var employeeamount = 0; // Number of employees
var employeeCost = 100; // Cost of the first employee
var employeePower = 20; // Power of the employee
var productionPower = 110; // Power of the production
var productionUpgradeCost = 1000; // Cost of the production upgrade
var CardShopUnlocked = false; // Flag for the card shop
var autoclickTime = 1000; // Time interval for the autoclicker, set to 1 second as default
var employeeTime = 3000; // Time interval for the employee production, set to 3 seconds as default

var cardsInHand = 0; // Number of cards in hand
var maxCardsInHand = 1;
var card1Flag = false;
var card2Flag = false;
var card3Flag = false;

var card2Power = 0.05;
var stockMarketMin = 0.1;
var stockMarketMax = 20;
var stockMarketBalancer = 0.1;


// Flags for Magic Tree Upgrades to see if the player has bought them
var MTU_1_flag = false;
var MTU_2_flag = false;
var MTU_3_flag = false;
var MTU_4_flag = false;
var MTU_5_flag = false;
var MTU_6_flag = false;
var MTU_7_flag = false;


// Get references to the button and the total + skill point display
const button = document.getElementById('Button');
const totalDisplay = document.getElementById('TOTAL');
const skillPointDisplay = document.getElementById('SkillPoints'); // Reference the Skill Point display


// References for Shop Upgrades


/// References for Click Upgrade
const upgradeButton = document.getElementById('CLICKUPGRADE');
const upgradeCostDisplay = document.getElementById('CLICKUPGRADECOST');
// References for AutoClick Upgrade
const autoclickButton = document.getElementById('AUTOCLICKUPGRADE');
const autoclickCostDisplay = document.getElementById('AUTOCLICKUPGRADECOST');
// References for Employee Upgrade
const employeeHireButton = document.getElementById('EMPLOYEEHIRE');
const employeeHireCostDisplay = document.getElementById('EMPLOYEECOST');
// References for Production Upgrade
const productionUpgradeButton = document.getElementById('PRODUCTIONUPGRADE');
const productionUpgradeCostDisplay = document.getElementById('PRODUCTIONUPGRADECOST');
const productionUpgradeDisplay = document.getElementById('ProductionUpgradeDisplay');

//References for Magic Tree Upgrades


const magicTreeUpgrade1 = document.getElementById('MTU_1');
const magicTreeUpgrade2 = document.getElementById('MTU_2');
const magicTreeUpgrade3 = document.getElementById('MTU_3');
const magicTreeUpgrade4 = document.getElementById('MTU_4');
const magicTreeUpgrade5 = document.getElementById('MTU_5');
const magicTreeUpgrade6 = document.getElementById('MTU_6');
const magicTreeUpgrade7 = document.getElementById('MTU_7');


// Basic function for clicking the button
button.addEventListener('click', () => {
    total += clickPower; // Increment total clicks by clickPower
    updateDisplay(); // Update the display
    playAudio();

    if (MTU_5_flag === true) {
        const randomPercentage = (Math.random() * (0.001 - 0.0001) + 0.0001);
        const increaseAmount = Math.ceil(randomPercentage * total);
        clickPower += increaseAmount;
        // Increase click power by 0.01% to 0.1% of TOTAL every click
    }

    if (MTU_1_flag === true) {
        clickPower += 1; // Increases click power by 1 every click
        clickPower += Math.ceil(clickPower * 0.01); // Increases click power by 1% of itself every click
    }

});

function playAudio(src = "audio/click.wav") {
    const audio = new Audio(src);
    audio.volume = 0.75;
    audio.playbackRate = 0.9;
    audio.play();
}


                            //////////  BASE UPGRADE FUNCTIONS (SHOP TAB)  ///////////


// Buying clickUpgrade function
upgradeButton.addEventListener('click', clickUpgrade);

function clickUpgrade() {
    if (total >= upgradeCost) { // Check if there are enough clicks for the upgrade
        total -= upgradeCost; // Deduct the cost of the upgrade
        clickPower += 1; // Increase click power
        autoclickPower += 1; // Increase autoclick power
        upgradeCost = Math.ceil(upgradeCost * 1.15); // Increase and round up the cost of the next upgrade
        updateDisplay(); // Update the display
    }
    else {
        alert("You're broke lmao"); // Alert if not enough clicks
    }
}

// Buying autoclickUpgrade function
autoclickButton.addEventListener('click', autoclickUpgrade);

function autoclickUpgrade() {
    if (total >= autoclickCost) { // Check if there are enough clicks for the second upgrade
        total -= autoclickCost; // Deduct the cost of the upgrade
        autoclickCost = Math.ceil(autoclickCost * 1.6); // Increase and round up the cost of the next upgrade
        autoclickFlag = true; // Set the flag for the second upgrade
        autoclickPower += 1;
        autoclickPower += Math.ceil(clickPower * 0.1); // Increase autoclick power by 10% of click power
        if (MTU_7_check === true) {
            autoclickPower *= 2;
        }
        updateDisplay(); // Update the display
    }
    else {
        alert("You're broke lmao"); // Alert if not enough clicks
    }
}

// Buying employees function
employeeHireButton.addEventListener('click', hireEmployee);

function hireEmployee() {
    if (total >= employeeCost) {
        total -= employeeCost; // Deduct the cost of the employee
        employeeamount += 1; // Increase the number of employees
        employeeCost = Math.ceil(employeeCost * 1.8); // Increase and round up the cost of the next employee
        updateDisplay(); // Update the display
    }
    else {
        alert("You're broke lmao"); // Alert if not enough clicks
    }
}

/// Upgrading overall production function
productionUpgradeButton.addEventListener('click', upgradeProduction);

function upgradeProduction() {
    if (total >= productionUpgradeCost) { // Check if there are enough clicks for the production upgrade
        total -= productionUpgradeCost; // Deduct the cost of the upgrade
        // Production power is 110 initially, so it can easily be upgraded later down the line
            clickPower *= Math.ceil(productionPower/100);
            autoclickPower *= Math.ceil(productionPower/100);
            employeePower *= Math.ceil(productionPower/100);
        productionUpgradeCost = Math.ceil(productionUpgradeCost * 2)// Increase and round up the cost of the next upgrade
        updateDisplay(); // Update the display
    }
    else {
        alert("You're broke lmao"); // Alert if not enough clicks
    }
}


function autoclick() {
    if (autoclickFlag === true) { // Check if the second upgrade is active
        total += autoclickPower; // Increment total clicks by autoclick power
        updateDisplay(); // Update the display
        if (card1Flag === true) {
            total += Math.ceil(autoclickPower * 3);
        }
        if (MTU_1_flag === true) {
            clickPower += 1; // Increases click power by 1 every click
            autoclickPower += 1; // Increases autoclick power by 1 every click
            clickPower += Math.cecil(clickPower * 0.01); // Increases click power by 1% of itself every click
        }
        if (MTU_7_flag === true) {
            autoclickPower += Math.ceil(autoclickPower * 0.001);
            total += Math.ceil(autoclickPower * 10);
        }
    }
}

function employeeProduce() {
    if (employeeamount > 0) {
        if (card3Flag === true){
            const randomMultiplier = (Math.random() * (stockMarketMax - stockMarketMin) + stockMarketBalancer);

//I need this space to explain the function up above
//Math.random() generates a random number between 0 and 1
//(20 - 0.1) represents the "range" of the random number, meaning how many values it can return, so it has a range of 19.9
//That range gets multiplied by the Math.random() function, so 0 stays the same while the 1 changes to a 19.9
//Remember, Math.random() returns a number between 0 and 1, so by changing those min and max values, we can alter the results of the random number being returned
//The "+0.1" is added at the end to ensure that the random number is never 0, so the minimum value it can return is 0.1

//With the changes that the MTU_4 upgrade brings, we had to replace the (20-0.1) with (stockMarketMax - stockMarketMin) so we can edit their values later
//This includes the 0.1 we add at the end that ensures the number is never 0.

            const increaseAmount = Math.ceil(randomMultiplier * employeePower * employeeamount);
            total += increaseAmount;
            console.log(randomMultiplier);
            updateDisplay();
        }
        else {
            total += Math.ceil(employeePower * employeeamount); // Increment total clicks by employee power times the number of employees
            updateDisplay();
        }
        if (card2Flag === true) {
            for (let i = 0; i < employeeamount; i++) { // Gets number of employees and triggers function for each employee player has
                total += Math.ceil(employeePower * card2Power);
            }
        }
    }
   
}


                            //////////  CARD SHOP UPGRADES (CARD TAB)  ///////////



// Checks to see if the player has enough TOTAL to unlock the Card Shop
function cardShopCheck() {
    const span = document.getElementById("CardShopSelect"); // Get the span element
    if (total >= 10000) {
        span.removeAttribute("hidden"); // Remove the hidden attribute from the span element
        document.getElementById("ActiveCards").style.display="block";
    }
}

let lists = document.getElementsByClassName("list");
let activeCardContainer = document.getElementById("ActiveCards");
let cardCollectionContainer = document.getElementById("CardCollection");

// Add dragover and drop listeners to activeCardContainer for desktop
activeCardContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
});

activeCardContainer.addEventListener("drop", function (e) {
    e.preventDefault();

    // Check if the activeCardContainer already has a card
    if (cardsInHand >= maxCardsInHand) {
        alert("You can only have 1 card in your hand at a time!");
        return; // Prevent additional cards from being dropped
    }

    // Add the card to ActiveCards
    if (selected) {
        activeCardContainer.appendChild(selected);
        selected = null;
        cardsInHand = 1; // Set cardsInHand to 1 since a card is now in ActiveCards
    }
});

// Add touch support for mobile devices
activeCardContainer.addEventListener("touchmove", function (e) {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.classList.contains("list")) {
        selected = element; // Set the selected card
    }
});

activeCardContainer.addEventListener("touchend", function (e) {
    e.preventDefault();

    // Check if the activeCardContainer already has a card
    if (cardsInHand >= maxCardsInHand) {
        alert("You can only have 1 card in your hand at a time!");
        return; // Prevent additional cards from being dropped
    }

    // Add the card to ActiveCards
    if (selected) {
        activeCardContainer.appendChild(selected);
        selected = null;
        cardsInHand = 1; // Set cardsInHand to 1 since a card is now in ActiveCards
    }
});

// Add dragstart listener to each card for desktop
for (let list of lists) {
    list.addEventListener("dragstart", function (e) {
        selected = e.target; // Set the selected card
    });
}

// Add touchstart listener to each card for mobile
for (let list of lists) {
    list.addEventListener("touchstart", function (e) {
        selected = e.target; // Set the selected card
    });
}

// Add dragover and drop listeners to cardCollectionContainer for desktop
cardCollectionContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
});

cardCollectionContainer.addEventListener("drop", function (e) {
    e.preventDefault();

    // Return the card to CardCollection
    if (selected) {
        cardCollectionContainer.appendChild(selected);
        selected = null;
        cardsInHand = 0; // Reset cardsInHand to 0 since the card is back in CardCollection
    }
});

// Add touchend listener to cardCollectionContainer for mobile
cardCollectionContainer.addEventListener("touchend", function (e) {
    e.preventDefault();

    // Return the card to CardCollection
    if (selected) {
        cardCollectionContainer.appendChild(selected);
        selected = null;
        cardsInHand = 0; // Reset cardsInHand to 0 since the card is back in CardCollection
    }
});


                                        ///////// MAGIC TREE ///////////



// Checks to see if the player has enough TOTAL to unlock the Magic Tree
function magicTreeCheck() {
    const span = document.getElementById("MagicTreeSelect"); // Get the span element
    const p = document.getElementById("SkillPoints"); // Reference the Skill Point display
    if (total >= 1000000) {
        span.removeAttribute("hidden"); // Remove the hidden attribute from the span element
        p.removeAttribute("hidden");
    }
}

var skillPointDependency = 1;

function addSkillPoints() {
    if (total >= skillPointDependency * 1000000) {
        // skillPointDependency is kept at 1 so when multiplied in the if statement it's still 1,000,000
        skillPointDependency += 1; // Increase the skill point dependency by 1
        skillPoints += 1;
        updateDisplay();
    }
}


// When buying the first Magic Tree Upgrade
magicTreeUpgrade1.addEventListener('click', MTU_1_check);
function MTU_1_check() {
    if (skillPoints >= 1) {
        skillPoints -= 1;
        MTU_1_flag = true;
        magicTreeUpgrade1.disabled = true;
        magicTreeUpgrade2.hidden = false;
    }
    else {
        alert("You're broke!!!!!!");
    }
}

magicTreeUpgrade2.addEventListener('click', MTU_2_check);
function MTU_2_check() {
    if (skillPoints >= 10) {
        skillPoints -= 10;
        MTU_2_flag = true
  
        
        // Halve the time for autoclicker and employee production
        autoclickTime = Math.max(autoclickTime / 2, 10); 
        employeeTime = Math.max(employeeTime / 2, 10); 
 
        // Clear and reset intervals with the new times
        clearInterval(autoclickInterval);
        clearInterval(employeeInterval);
 
        autoclickInterval = setInterval(autoclick, autoclickTime);
        employeeInterval = setInterval(employeeProduce, employeeTime);
 
        updateDisplay(); // Update the display

        magicTreeUpgrade2.disabled = true;
        magicTreeUpgrade3.hidden = false;
    }
    else {
        alert("Smells like broke in here");
    }
}

magicTreeUpgrade3.addEventListener('click', MTU_3_check);
function MTU_3_check() {
    if (skillPoints >= 1000) {
        skillPoints -= 1000;
        MTU_3_flag = true

        productionUpgradeCost /= 2;
        productionPower += 20;

        updateDisplay();

        magicTreeUpgrade3.disabled = true;
        magicTreeUpgrade4.hidden = false;
    }
    else {
        alert("You're skill points are giving unemployed vibes right now get your money up");
    }
}

magicTreeUpgrade4.addEventListener('click', MTU_4_check);
function MTU_4_check() {
    if (skillPoints >= 100000) {
        skillPoints -= 100000;
        MTU_4_flag = true;

        stockMarketMin = 1;
        stockMarketMax = 30;
        stockMarketBalancer = 1;

        updateDisplay();
        magicTreeUpgrade4.disabled = true;
        magicTreeUpgrade5.hidden = false;
    }
    else {
        alert("This isn't funny anymore you need a job");
    }
}

magicTreeUpgrade5.addEventListener('click', MTU_5_check);
function MTU_5_check() {
    if (skillPoints >= 25000000) {
        skillPoints -= 25000000;
        MTU_5_flag = true;

        updateDisplay();
        magicTreeUpgrade5.disabled = true;
        magicTreeUpgrade6.hidden = false;
    }
    else {
        alert("You need more money");
    }
}

magicTreeUpgrade6.addEventListener('click', MTU_6_check);
function MTU_6_check() {
    if (skillPoints >= 1000000000) {
        skillPoints -= 1000000000;
        MTU_6_flag = true; 

        card2Power = 0.2;

        updateDisplay();
        magicTreeUpgrade6.disabled = true;
        magicTreeUpgrade7.hidden = false;
    }
    else {
        alert("You need more skill points");
    }
}

magicTreeUpgrade7.addEventListener('click', MTU_7_check);
function MTU_7_check() {
    if (skillPoints >= 500000000000000) {
        skillPoints -= 500000000000000;
        MTU_7_flag = true;

           // Halve the time for autoclicker and employee production
           autoclickTime = Math.max(autoclickTime / 5, 10); 
    
           // Clear and reset intervals with the new times
           clearInterval(autoclickInterval);
    
           autoclickInterval = setInterval(autoclick, autoclickTime);

        autoclickPower *= 10;

        updateDisplay();
        magicTreeUpgrade7.disabled = true;
    }
    else {
        alert("You're almost there until the final upgrade! Just a few more skill points!");
    }
}

//DEBUG STUFF


const debugButton = document.getElementById('DEBUG');
debugButton.addEventListener('click', giveDebugCheat);

function giveDebugCheat() {
    total += 10000; // Add 10,000 which unlocks the Card tab
}

const debugButton2 = document.getElementById('DEBUG2');
debugButton2.addEventListener('click', giveDebugCheat2);

function giveDebugCheat2() {
    total += 1000000; // Add 1,000,000 which unlocks the Magic Tree tab
}

const debugButton3 = document.getElementById('DEBUG3');
debugButton3.addEventListener('click', giveDebugCheat3);

function giveDebugCheat3() {
    skillPoints += 5000000000000000; 
}


// Function to open and close the sidebars
function openShop() {
    document.getElementById("ShopSideNav").style.width = "250px";
    document.getElementById("main_Upgrade").style.marginLeft = "250px";
  }
  
  function openCardShop() {
      document.getElementById("CardShopSideNav").style.width = "250px";
      document.getElementById("CardShop").style.marginLeft = "250px";
  }
  
  function openMagicTree() {
      document.getElementById("MagicTreeSideNav").style.width = "250px";
      document.getElementById("MagicTree").style.marginLeft = "250px";
  }

  function closeShop() {
    document.getElementById("ShopSideNav").style.width = "0";
    document.getElementById("main_Upgrade").style.marginLeft= "0";
  }

    function closeCardShop() {
        document.getElementById("CardShopSideNav").style.width = "0";
        document.getElementById("CardShop").style.marginLeft= "0";
    }

    function closeMagicTree() {
        document.getElementById("MagicTreeSideNav").style.width = "0";
        document.getElementById("MagicTree").style.marginLeft= "0";
    }

var menu = document.getElementById("menu");

function openSettings() {
    menu.style.top = "12%"
}

function closeSettings() {
    menu.style.top = "-300vh";
}

function goFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}

// Stuff like display udates and timed intervals

// Function to update the display
function updateDisplay() {
    totalDisplay.textContent = total;
    skillPointDisplay.textContent = `Skill Points: ${skillPoints}`;
    upgradeCostDisplay.textContent = upgradeCost;
    autoclickCostDisplay.textContent = autoclickCost;
    employeeHireCostDisplay.textContent = employeeCost;
    productionUpgradeCostDisplay.textContent = productionUpgradeCost;
    productionUpgradeDisplay.textContent = `Increase all production by ${productionPower - 100}%`; // Update the display for the production upgrade cost
}

// Sets an interval for Auto Clicker and Employees
let autoclickInterval = setInterval(autoclick, autoclickTime);
let employeeInterval = setInterval(employeeProduce, employeeTime);

// Update the display every 1ms
setInterval(updateDisplay, 10);


setInterval(cardShopCheck, 100);

setInterval(magicTreeCheck, 100);

// Checks to see if the player has enough TOTAL to obtain 1 skill point
setInterval(addSkillPoints, 10);
