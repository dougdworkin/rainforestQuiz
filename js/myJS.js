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
								"<em>99%</em> - It's bright and sunny!",
								"<em>70%</em> - There is a sofy hazy light.",
								"<em>40%</em> - It's kind of dark...",
								"<em>1%</em> - Who turned out the lights?"
							],
				answer: 	3,
				infoSection:"Rainforests aren’t as bright as one might think—less than one percent of sunlight reaches the forest floor." +
							" The rainforest floor is often dark and humid due to constant shade from the canopy’s leaves."
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
				infoSection:"More than half of the world's species of plants and animals are found in the rainforest."+
							" Rainforests support a very broad array of fauna, including mammals, reptiles, birds and invertebrates."						
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
				infoSection:"Brazil is home to more uncontacted peoples than anywhere on the planet. It is now thought that approximately 80 such groups live in the Amazon."+
							" Some number several hundred and live in remote border areas and in protected territories."+
							" Others are scattered fragments, the survivors of tribes virtually wiped out by the impacts of the rubber boom and expanding agriculture in the last century" 								
			},

			//Question four		
			{ 	question : 	"How often is an area of rainforest the size of a football field destroyed daily?", 
				choices: 	[
								"Once a day",
								"Every hour",
								"Every minute",
								"Every second"
							],
				answer: 	3,
				infoSection:"That is more than 150 acres lost every minute of every day," +
							" and 78 million acres lost every year! More than 20 percent of" +
							" the Amazon rainforest is already gone, and much more is severely threatened "+
							"as the destruction continues. It is estimated that the Amazon alone is vanishing" +
							" at a rate of 20,000 square miles a year." 								
			},

		];


//FUNCTION: starts quiz when "Start quiz" button is pressed
function startQuiz() {
	$('div.front').show(); // shows div with question
	$('div.back').hide(); // hides div with answer
	$('div#intro').slideUp(800); //intro div slides up revealing quiz question
	questionSetUp(quizQuestions[progress]); // function run to add question and choices
	//inserts the number of questions that will be asked in progress bar
	$('#quizPage h2 > span.questionCount').html(quizQuestions.length);
}


// FUNCTION: place questions & choices in the question card
function questionSetUp(question){
	var questionTxt = $('.question legend'), // grabs question area
		answerList = $('div#choiceArea'); // grabs div to insert answer choices
	//Insert the current question number in progess bar	
	$('#quizPage h2 > span.answered').html(progress + 1);
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


//FUNCTION: Checks/reveals answer and gives answer details
function checkAnswer(){
	// stop submit from reloading page
	$('form#questionForm').submit(function(e){
		e.preventDefault();
	});

	answerChoice = $('form#questionForm input[type="radio"]:checked').val(); // captures selected answer
	currentQuestion = quizQuestions[progress];

	//Why does the required functionality only work if I have this if/else statement?
	if (!answerChoice) {
		
	} else {

		$('h3.rightWrong').html(''); // clear any previous answer feedback
		$('p.answerDetails').html(''); // clear any previous answer details
		
		
		$('div.front').hide(); // hides div with answer
		$('div.back').show(); // hides div with answer

		//check if right or wrong and display result
		if(answerChoice == quizQuestions[progress].answer) {
			$('h3.rightWrong').append('Correct!');	
			score++;
		} else {
			$('h3.rightWrong').append('Nice Try but incorrect');
		}
		//add the answer details
		$('p.answerDetails').append('<span class="answerHeader">The answers is:<br><em>' + 
			currentQuestion.choices[currentQuestion.answer] + '</em></span>' +
			currentQuestion.infoSection);
		// moves snake along progress bar
		if (progress==0){
			$('div#snake').attr('class', 'firstQ');
			console.log('snake'); 
		}else if (progress==1){
			$('div#snake').attr('class','halfWay'); 
		}else if(progress==2){
			$('div#snake').attr('class', 'twoThirds'); 
		}else {
			$('div#snake').attr('class', 'complete'); 
		}

		progress++;	// add one to the progress count

		// If last question change button and progress bar text
		if(progress == quizQuestions.length) {
			$('div#buttonHolder').html('<button class="showScore">Show Final Score</button>');
			$('button.showScore').on('click', showFinalScore); // set up button to show final score info
			$('section.progressBar > h2').html("You've completed the quiz");
		}
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
	var scorePercent = (score * 100)/progress;
	$('.questionH2').html('YOUR SCORE'); // changes H2 text
	$('div#buttonHolder').html('<button class="retakeQuiz">Retake Quiz</button>'); // changes button text
	$('button.retakeQuiz').on('click', startOver); // sets up startover function for button click
	// shows final score
	$('h3.rightWrong')
		.html('You got ' + score + ' out of ' + progress + ' right!'+
				'<br><em>Your score is ' + scorePercent + '%</em>')
		.css('textAlign', 'center');
	//creates a div for score feedback	
	$('<div class="scoreMessage"></div>' ).insertAfter('h3.rightWrong');
	// gives message about players score	
	if (scorePercent == 100){
		$('div.scoreMessage').append('Great job braniac!<br>You got all the questions right!');
	} else if (scorePercent >= 75){
		$('div.scoreMessage').append('Good job! You got a lot of the questions right!');
	} else if (scorePercent >=50){
		$('div.scoreMessage').append('Not bad! Maybe you want to try again for a better score?');
	} else {
			$('div.scoreMessage').append('Too bad but nice try.<br> Maybe you want to try again for a better score?');
	};
}

//FUNCTION: Resets quiz to start over
function startOver(){
	progress = 0; // resets progress count
	score = 0; // resets score
	answerChoice = null; // resets answer choice
	clearAll(); // clears out all other text and questions
	$('div.scoreMessage').remove(); // removes score message
	$('div#snake').attr('class', 'start'); //sets snake back to begining
	$('h3.rightWrong').css('textAlign', 'left'); // realigns feedback text
	$('.questionH2').html('Question <span class="qNumber front"></span>'); // recreates original H2
	$('div#buttonHolder').html('<button class="nextQ">Next Question</button>'); // recreates "next question" button
	$('button.nextQ').on('click', nextQuestion); // sets up click event for button again
	// resets the progress bar header
	$('section.progressBar > h2').html('Question <span class="answered">0</span> out of <span class="questionCount">4</span>');
	startQuiz();
}


$('div#intro button.startQuiz').on('click', startQuiz); // sets up "start quiz" button

$('div.question.choices input[type="submit"]').on('click', checkAnswer); // sets up "check answer" button

$('button.nextQ').on('click', nextQuestion); // sets up "next question" button






});


