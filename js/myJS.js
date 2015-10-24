$(document).ready(function(){



var		progress = 0,
		score = 0,
		answer,
		quizQuestions =  [

			//Question One	
			{ 	question : 	"How much sunlight typically " +
							" makes it's way to the forest floor??",
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
			{ 	question : 	"This is question 2", 
				choices: 	[
								"<em>99%</em> - It's bright and sunny!",
								"<em>70%</em> - There is a sofy hazy light.",
								"<em>40%</em> - It's kind of dark...",
								"<em>1%</em> - Who turned out the lights?"
							],
				answer: 	3,
				infoSection:"More infirmation about the brightness goes here" 								
			},

			//Question three		
			{ 	question : 	"This is question 3", 
				choices: 	[
								"<em>99%</em> - It's bright and sunny!",
								"<em>70%</em> - There is a sofy hazy light.",
								"<em>40%</em> - It's kind of dark...",
								"<em>1%</em> - Who turned out the lights?"
							],
				answer: 	3,
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


//starts quiz when "Start quiz" button is pressed
function startQuiz() {
	$('div#intro').slideUp(800); //div slides up revealing quiz
	$('div#quizPage').css('display', 'block'); // first quiz question is shown
	questionSetUp(quizQuestions[progress]); // question added to card
	progress++;	// add one to the progress count
}


//place questions & choices in the question card
function questionSetUp(question){
	var questionTxt = $('.question legend'),
		answerList = $('div#choiceArea');
	//enter question #	
	$('.question > h2 > span.qNumber').html(progress + 1);
	//enter question in legend
	questionTxt.html(question.question);
	// loop through choice array and enter input choices and labels 
	for (var i = 0; i < question.choices.length; i++){
		answerList.append('<label for="a' + 
							(i+1) +
							'">' +
							'<input id="a' + 
							(i+1) +
							'"'+
							' type="radio" name="questionOne" required value="' + 
							i + 
							'">' +
							'<span>' + 
							question.choices[i] +
							'</label>');	
	}	
}



// hides question and checks/reveals answer and gives expanation
function checkAnswer(){
	event.preventDefault();

//log answer
	answer = $('input[type="radio"]:checked').val();
	
	$('div.question.choices').fadeOut();
	$('div.question.answer').fadeIn();

//check if right or wrong and display result
	if(answer == quizQuestions[progress-1].answer) {
		$('h3.rightWrong').append('Correct!');	
		score++;
	} else {
		$('h3.rightWrong').append('Nice Try but incorrect');
	}
//add the answer details
	$('p.answerDetails').append(quizQuestions[progress-1].infoSection);

// check if last question
	if(progress == quizQuestions.length) {
		$('div#buttonHolder').html('<button class="showScore">Show Final Score</button>');
		$('button.showScore').on('click', showFinalScore);	
	}
}

// deletes question, choices, right/wrong text and answer info	
function clearAll() {
	$('.question legend').html('');
	$('div#choiceArea').html('');
	$('h3.rightWrong').html('');
	$('p.answerDetails').html('');
}

function nextQuestion(){
// hide answer panel - show question panel
	$('div.question.answer').fadeOut();
	$('div.question.choices').fadeIn();
	clearAll();
// add next question and answers
	questionSetUp(quizQuestions[progress]);
	progress++;	// add one to the progress count
}

function showFinalScore(){
	clearAll();
	$('.questionH2').html('YOUR SCORE');
	$('div#buttonHolder').html('<button class="retakeQuiz">Retake Quiz</button>');
	$('button.retakeQuiz').on('click', startOver);
	$('h3.rightWrong').slideDown().css('text-align', 'center');
	$('h3.rightWrong').html('You got ' + score + ' out of ' + progress + ' right!');

}

function startOver(){
	progress = 0;
	score = 0;
	clearAll();
	$('h3.rightWrong').css('text-align', 'left');
	$('div#buttonHolder').html('<button class="nextQ">Next Question</button>');
	$('.questionH2').html('Question <span class=qNumber></span>');
	$('div.question.answer').fadeOut();
	$('div.question.choices').fadeIn();
	$('button.nextQ').on('click', nextQuestion);
	startQuiz();
}


$('div#intro button.startQuiz').on('click', startQuiz);

$('div.question.choices input[type="submit"]').on('click', checkAnswer);

$('button.nextQ').on('click', nextQuestion);






});


