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
				infoSection:"More infirmation about the brightness goes here" 								
			},

			//Question two		
			{ 	question : 	"How much sunlight typically " +
							" makes it's way to the florest floor",
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
			{ 	question : 	"How much sunlight typically " +
							" makes it's way to the florest floor",
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
			{ 	question : 	"How much sunlight typically " +
							" makes it's way to the florest floor",
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
		answerList.append('<label for"a' + (i+1) + '">' +
					'<input id="a' + (i+1) + '"'+
					' type="radio" name="questionOne" required value="' + i + '">' +
					'<span>' + question.choices[i] +
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
	} else {
		$('h3.rightWrong').append('Nice Try but incorrect');
	}

}



$('div#intro button').on('click', startQuiz);

$('div.question.choices input[type="submit"]').on('click', checkAnswer);




});


