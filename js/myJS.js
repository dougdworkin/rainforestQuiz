$(document).ready(function(){



var		questionCount = 0,
		score = 0,
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


//starts quiz
function startQuiz() {
	$('div#intro').slideUp(800);
	$('div#quizPage').css('display', 'block');
	console.log (quizQuestions[0].question);
	questionSetUp(quizQuestions[0]);	
}


//place questions & options in question card
function questionSetUp(question){
	var questionTxt = $('.question legend'),
		answerList = $('div#choiceArea');
	var	listItem = '<label for"a' + i + '">' +
					'<input id="a' + i + '"'+
					' type="radio" name="questionOne" required value="answer">' +
					'<span>' + question.choices[i-1] +
					'</label>';
	//enter question in legend
	questionTxt.html(question.question);
	// enter choices as list items
	for (var i = 0; i < question.choices.length; i++){
		answerList.append(listItem);	
	}	
}


function cardFlip(){
	
	alert('click worked');
}





$('div#intro button').on('click', startQuiz);

$('div.front').on('click', cardFlip);



});


