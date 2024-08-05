
// List of available colors for the game
var colorsList = ["red","blue","green","yellow"]

// Arrays to store the game's pattern and the user's pattern
var gamePattern = [];
var userClickedPattern = [];

// Variables to track game state
var play = false;
var level = 0

// Event listener to start the game when a key is pressed
document.addEventListener("keydown", function(){
    document.querySelector("h2").innerHTML="Level : "+level;
    nextStep()
    play = true;
})


// Function to generate the next step in the game pattern
function nextStep(){
    // Clear the user's pattern for the new level
    userClickedPattern = [];
    level++;
    document.querySelector("h2").innerHTML = "Level : "+level

    // Generate a random number between 0 and 3
    var randomNum = Math.floor(Math.random()*4) 

    // Get a random color from the colorsList using the random number
    var randomColor = colorsList[randomNum]

    // Add the selected color to the game pattern
    gamePattern.push(randomColor)

    // Trigger the animation for the selected color
    var colorAni = (document.querySelector("."+randomColor))
    animationBtn(colorAni.innerHTML)
}

// Add event listeners to each button on the page
var noofButtons = document.querySelectorAll(".btn").length;
for (i=0; i<noofButtons; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){

        // Trigger the animation for the clicked button
        animationBtn(this.innerHTML)  
        // Add the clicked color to the user's pattern
        userClickedPattern.push(this.innerHTML)
        // Check the user's answer against the game pattern
        checkAns(userClickedPattern.length-1)
    })
}



// Function to check the user's answer
function checkAns(currentLevel){
    // Check if the current color matches the game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // If the user has completed the current pattern, move to the next step
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextStep();
            },1000)
        }
    }else{
        // If the user makes a mistake, end the game
        document.querySelector("body").classList.add("gameOver");
        document.querySelector("h2").innerHTML = "Game Over, Press Any Key to Restart";

        // Remove the game over class after a short delay
        setTimeout(function(){
            document.querySelector("body").classList.remove("gameOver")
        },2000)

        // Restart the game
        startAgain()
    }
}

// Function to reset the game state and start again 
function startAgain(){
    level = 0 ; 
    gamePattern = []
    play = false
}


// Function to animate button presses
function animationBtn(key){

    document.querySelector("."+key).classList.add("pressed")
    setTimeout(function(){
        document.querySelector("."+key).classList.remove("pressed")
    },100)

}
