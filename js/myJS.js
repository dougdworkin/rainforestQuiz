$(document).ready(function(){



var		progress = 0,
		score = 0,
		answerChoice,
		quizQuestions =  [
//set up all up questions
			//Question One	
			{ 	question : 	"How much sunlight typically " +
							" makes it's way to the forest floor?",
				choices: 	[
								"<em>99%</em> - It's bright and sunny!x",
								"<em>70%</em> - There is a sofy hazy light.x",
								"<em>40%</em> - It's kind of dark...x",
								"<em>1%</em> - Who turned out the lights?x"
							],
				answer: 	3,
				infoSection:"More infirmation about the brightness goes here. Lorem" +
							" ipsum dolor sit amet, consectetur adipisicing elit. Aliquam" +
							" adipisci, mollitia quas autem doloremque maiores perspiciatis" +
							" dicta odit fugit numquam iusto, ea veniam, id, cupiditate."
			},

			//Question two		
			{ 	question : 	"Tropical rainforests only cover about 6% of the Earth’s surface." +
							"<span>How many of all known species of plants and animals live in them?</span>", 
				choices: 	[
								"About a quarter",
								"One third",
								"More than half",
								"Everyone's there but you"
							],
				answer: 	2,
				infoSection:"More information about the % of species goes here" 								
			},

			//Question three		
			{ 	question : 	"How many separate uncontacted tribes are left" +
							"in the Brazilian Amazon rainforest?", 
				choices: 	[
								"At least 77",
								"About 54",
								"Between 15 and 25",
								"No more than 6"
							],
				answer: 	0,
				infoSection:"More infirmation about the brightness goes here" 								
			},

			//Question four		
			{ 	question : 	"This is question 4", 
				choices: 	[
								"<em>99%</em> - It's bright and sunny!",
								"<em>70%</em> - There is a sofy hazy light.",
								"<em>40%</em> - It's kind of dark...",
								"<em>1%</em> - Who turned out the lights?"
							],
				answer: 	3,
				infoSection:"More infirmation about the brightness goes here" 								
			}

		];


//FUNCTION: starts quiz when "Start quiz" button is pressed
function startQuiz() {
	$('div.back').hide(); // hides div with answer
	$('div.front').show(); // hides div with answer
	$('div#intro').slideUp(800); //intro div slides up revealing quiz question
	$('div#quizPage').css('display', 'block'); // first quiz question is shown
	questionSetUp(quizQuestions[progress]); // function run to add question and choices
}


// FUNCTION: place questions & choices in the question card
function questionSetUp(question){
	var questionTxt = $('.question legend'), // grabs question area
		answerList = $('div#choiceArea'); // grabs div to insert answer choices
	//Insert the current question number at top 	
	$('.question > h2 > span.qNumber.front').html(progress + 1);
	//Insert current question 
	questionTxt.html(question.question);
	// loop through choice array and enter radio buttons with answer choices 
	for (var i = 0; i < question.choices.length; i++){
		answerList.append('<label for="a' + (i) + '">' +
							'<input id="a' + (i) + '"'+
							' type="radio" name="answerChoice" required ' +
							'value="' + i + '">' +
							'<span>' + 
							question.choices[i] +
							'</label>');	
	}


}

//FUNCTION: decide to show front or back when Rotate3D plugin is used
function mySideChange(front) {
    if (front) {
        $('div.front').show();
        $('div.back').hide();
        
    } else {
        $('div.front').hide();
        $('div.back').show();
    }
}


//FUNCTION: Checks/reveals answer and gives answer details
function checkAnswer(){
	event.preventDefault(); // stop submit from reloading page
	$('h3.rightWrong').html(''); // clear any previous answer feedback
	$('p.answerDetails').html(''); // clear any previous answer details
	answerChoice = $('form#questionForm input[type="radio"]:checked').val(); // captures selected answer
	
	$('div.front').hide(); // hides div with answer
	$('div.back').show(); // hides div with answer

	$('.question > h2 > span.qNumber.back').html(progress +1); // show question #

	//check if right or wrong and display result
	if(answerChoice == quizQuestions[progress].answer) {
		$('h3.rightWrong').append('Correct!');	
		score++;
	} else {
		$('h3.rightWrong').append('Nice Try but incorrect');
	}
	//add the answer details
	$('p.answerDetails').append(quizQuestions[progress].infoSection);

	progress++;	// add one to the progress count

	// If last question change "next" button to "show final score" button
	if(progress == quizQuestions.length) {
		$('div#buttonHolder').html('<button class="showScore">Show Final Score</button>');
		$('button.showScore').on('click', showFinalScore); // set up button to show final score info
	}
}

// FUNCTION: Removes all previous question info	
function clearAll() {
	$('.question legend').html(''); //removes question
	$('div#choiceArea').html(''); // removes choices
	$('h3.rightWrong').html(''); // removes feedback
	$('p.answerDetails').html(''); //removes answer details
}

// FUNCTION: Shows next question
function nextQuestion(){
	$('.question legend').html(''); // clears out old question
	$('div#choiceArea').html(''); // clears out old choices
	$('div.front').show(); // shows front question div
	$('div.back').hide(); // hides back answer div
	questionSetUp(quizQuestions[progress]); // adds in next quiz question and choices
}

//FUNCTION: Shows final score and resources and start over button
function showFinalScore(){
	clearAll();
	$('.questionH2').html('YOUR SCORE'); // changes H2 text
	$('div#buttonHolder').html('<button class="retakeQuiz">Retake Quiz</button>'); // changes button text
	$('button.retakeQuiz').on('click', startOver); // sets up startover function for button click
	// shows final score
	$('h3.rightWrong').html('You got ' + score + ' out of ' + progress + ' right!').css('textAlign', 'center');
}

//FUNCTION: Resets quiz to start over
function startOver(){
	progress = 0; // resets progress count
	score = 0; // resets score
	answerChoice = null; // resets answer choice
	clearAll(); // clears out all other text and questions
	$('h3.rightWrong').css('textAlign', 'left'); // realigns feedback text
	$('.questionH2').html('Question <span class="qNumber front"></span>'); // recreates original H2
	$('div#buttonHolder').html('<button class="nextQ">Next Question</button>'); // recreates "next question" button
	$('button.nextQ').on('click', nextQuestion); // sets up click event for button again
	startQuiz();
}


$('div#intro button.startQuiz').on('click', startQuiz); // sets up "start quiz" button

$('div.question.choices input[type="submit"]').on('click', checkAnswer); // sets up "check answer" button

$('button.nextQ').on('click', nextQuestion); // sets up "next question" button






});


