console.log("Before content loads!")
 	var winsEl;
 	var LossesEl;
 	var GuessRemainEl;
 	var LetterGuessEl;
 	var currentWord;
 	var puzzleSolved;

document.addEventListener("DOMContentLoaded", function() {
console.log("Dom content should be loaded")
	// array of possible user choices.

	var userGuess = ["a", "b", "c", "d", "e", "f", 
"g", "h", "i", "j", "k", "l", "m", "n", "o", 
"p", "q", "r", "s", "t", "u", "v", "w", "x", "z"]

// array of movie titles for user to guess
	var words = ["Twister", "Scarface", "Pulp Fiction", "Fame", "Clueless"]
	var images = {
		twister: "assets/images/twister.jpeg",
		scarface: "assets/images/scarface.jpeg",
		pulpFiction: "assets/images/pulp.jpeg",
		fame: "assets/images/fame.jpeg",
		clueless: "assets/images/clueless.jpeg",
	}
	var placesholders = "";

// Variables for tracking our wins, losses, guesses and letters used
 	var wins = 0;
 	var losses = 0;
 	var guesses = 12;
 	var lettersGuessed = [];
 	var wrongLetters = [];

 	var winsEl  = document.getElementById("wins");
 	var LossesEl = document.getElementById("losses");
 	var GuessRemainEl = document.getElementById("guesses-remaining");
 	var LetterGuessEl = document.getElementById("letter-guesses");
 	var currentWord = document.getElementById("current-word");
	var computerGuess = words[Math.floor(Math.random() * words.length)];
	var moviePosterEl = document.getElementById("movie-poster");
	var winningAudio = new Audio("assets/sounds/applause.mp3");
	var losingAudio = new Audio("assets/sounds/groan.mp3");

 	console.log("Im the current word", document.getElementById("current-word"));

 	function checkGuess(key){
 		if (lettersGuessed.indexOf(key) == -1){
 			lettersGuessed.push(key)
 			var placesholders = currentWord.innerHTML
 			var badGuess = true
 			placesholders = placesholders.split("")
 			console.log("im the placesholders", placesholders)
 	    	for (var i = 0; i < computerGuess.length; i++) {	

 	    		if (computerGuess.charAt(i).toLowerCase() === key) {
 	    			badGuess = false;
 	    			placesholders[i] = key;
 	    		}
	 	    	console.log(placesholders.join(""),computerGuess, "I'm inside the loop")
			}
				if (placesholders.join("") === computerGuess.toLowerCase()){
	 	    		wins++; 
	 	    		puzzleSolved = true;
	 	    		winsEl.innerHTML = wins;
	 	    		moviePosterEl.src = "assets/images/" + computerGuess.toLowerCase() + ".jpeg"
	 	    		winningAudio.play();

	 	    	}

	 	    	if (badGuess){
	 	    		guesses--;
	 	    		GuessRemainEl.innerHTML = guesses;
	 	    		wrongLetters.push(key);

				}
				if (guesses == 0){
	 	    		losses++; 
	 	    		LossesEl.innerHTML = losses;
	 	    		moviePosterEl.src = "assets/images/" + computerGuess.toLowerCase() + ".jpeg"
	 	    		losingAudio.play();

	 	    		document.onkeyup = function(event){
			      		if (event.keyCode === 32){
			      			newGame()
			      		}
			      	}
	 	    	}



				LetterGuessEl.innerHTML = lettersGuessed.join("-")

	 			currentWord.innerHTML = placesholders.join("")

 		}

 		
 	}

 	function newGame(){
 		puzzleSolved = false;
 		computerGuess = words[Math.floor(Math.random() * words.length)];
 		placesholders = "";
 		guesses = 12;
 		currentWord.innerHTML = ""
 		GuessRemainEl.innerHTML = guesses;
 		moviePosterEl.src = ""

 		for (var j = 0; j < computerGuess.length; j++) {
 			if (computerGuess[j] == " "){
 				placesholders += " "
 			}
 			else {
 				placesholders += "_";
 			}
 		}
 		console.log(currentWord)
 		currentWord.innerHTML = placesholders;
 		currentWord.style.fontSize = "40px";
 		LetterGuessEl.innerHTML = "";
 		lettersGuessed = []
 		wrongLetters = []

 		document.onkeyup = function(event){
      		if (event.keyCode === 32){
      			newGame()
      		} else if (!puzzleSolved){
				checkGuess(event.key.toLowerCase())
      		}
 		}
    
	}

	document.onkeyup = function(event){
		if (event.keyCode === 32){
			newGame()
		}
	}

})
