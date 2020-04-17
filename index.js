

const STORE = [
  {
    question: 'Where can leopards be found?',
    answer: [
      'Antarctica',
      'Europe and UK',
      'Australia and New Zealand',
      'Africa and Asia',
    ],
    correctAnswer:
      'Africa and Asia',
  },
  {
    question: 'Which answer is not true about a leopard?',
    answer: [
      'Leopards prefer to be around other leopards',
      'Leopards are solitary creatures',
      'Leopards have dark spots called rosettes',
      'Leopards spend a lot of their time on trees',
    ],
    correctAnswer:
      'Leopards prefer to be around other leopards',
  },
  {
    question: 'Where do leopards take the animal they caught?',
    answer: [
      'Into holes',
      'Up into the trees',
      'In the river',
      'Into caves',
    ],
    correctAnswer:
      'Up into the trees',
  },
  {
    question: 'What is true about leopards?',
    answer: [
      'They cannot hear well',
      'They are strong swimmers',
      'They are plant eaters',
      'They spend their time in rivers',
    ],
    correctAnswer:
      'They are strong swimmers',
  },
  {
    question: 'Which animal are leopards sometimes confused with?',
    answer: [
      'Hyena',
      'Jaguar',
      'Cheetah',
      'Tiger',
    ],
    correctAnswer:
      'Jaguar',
  },
  {
    question: 'How is a leopard\'s tail helpful?',
    answer: [
      'Helps to fend off predators',
      'Used to kill its prey',
      'Helps cool the leopard when its hot',
      'Helps in maintaining balance during chases and hunting',
    ],
    correctAnswer:
      'Helps in maintaining balance during chases and hunting',
  }];

let score = 0;
let questionNumber = 0;


function createForm(questionIndex) {
  let questionForm = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(questionForm).find('fieldset');

  STORE[questionIndex].answer.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });

  return questionForm;
}

function renderQuestions() {
  if (questionNumber < STORE.length) {
    return createForm(questionNumber);  
  }
  else {
    $('.questionContainer').hide();
    $('.buttonBox').hide();
    resultScore();
    $('.questionNumber').text(6);
    
  }
}


function clickStart() {
  $('.container').on('click', '.startButton', function (event) {
    $('.beginningContainer').hide();
    $('.startButton').hide();
    $('.questionNumber').text(1);
    $('.questionContainer').show();
    $('.questionContainer').prepend(renderQuestions());
    $('.buttonBox').append(`<button type="submit" class="submitButton button"> Submit</button > `)

  });
}


function submitAnswer() {
  $('.container').on('click', '.submitButton', function (event) {
    event.preventDefault();
    
    let selected = $('input:checked');
    let answer = selected.val();

    if(!answer){
      alert("Choose an Answer");
      return;
    }
    
    let correct = STORE[questionNumber].correctAnswer;
    
    if (answer === correct) {
      $('.feedBackBox').show();
      $('.feedBackBox').html(`<h2>You Are Correct!</h2>
      <img src="Leopard/correctLeopard.jpg" alt="correctLeopard" class="leopardResponse" width="350" height="250">`);
      
      updateScore(); 
      
    }
    else {
      $('.feedBackBox').show();
      $('.feedBackBox').html(`<h2>Wrong Answer!</h2> \n The correct answer is: \n ${correct}`);
    }
    $('.questionContainer').hide();
    $('.submitButton').hide();
    $('.buttonBox').append(`<button type="buttonNext" class="nextButton button"> Next</button> `)
  });
}

function updateScore() {
  score++;
  $('.score').text(score);
}


function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}


function nextQuestion() {
  $('.container').on('click', '.nextButton', function (event){
    $('.questionContainer').show();
    updateQuestionNumber();
    $('.questionContainer form').replaceWith(renderQuestions());
    $('.feedBackBox').hide();
    $('.nextButton').hide();
    $('.submitButton').show();
  });
}


function resultScore() {
  
  $('.resultBox').show();

  const excellent = [
    'Excellent!',
  ];
  const good = [
    'Good Job!',
  ];
  const nice = [
    'Nice try!',
  ];

  if (score >= 5) {
    response = excellent;
  } else if (score < 5 && score >= 3) {
    response = good;
  } else {
    response = nice;
  }
  return $('.resultBox').html(
    `<h1>${response[0]}</h1>
        <h2>Your score is ${score}/6</h2>
        
        <button type="submit" class="restartButton button">Restart</button>`        
  );
}

function resetResults(){
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
  $('.submitButton').remove();
  $('.nextButton').remove();
  $('.restartButton').remove();
  
}


function restartQuiz(){
$('.container').on('click','.restartButton',function(event) {
  event.preventDefault();
  resetResults();
  $('.resultBox').hide();
  $('.beginningContainer').show();
  $('.startButton').show();
  $('.buttonBox').show();

  
 });
}




function handleQuiz() {
  clickStart();
  renderQuestions();
  submitAnswer();
  nextQuestion();
  restartQuiz()
  
}


$(handleQuiz);