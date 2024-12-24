const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

const questions = [
  {
  q: "Where was the first kiwi fruit grown",
  ans: [
      { text: "New Zealand", correct: false },
      { text: "China", correct: true },
      { text: "India", correct: false },
      { text: "Chile", correct: false },
  ],
  },
  {
  q: "The chocolate cake known as a Sachertorte was created in which city?",
  ans: [
      { text: "Vienna", correct: true },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: false },
      { text: "Delhi", correct: false },
  ],
  },
  {
  q: "What cabbage dish is a staple in Korean cuisine?",
  ans: [
      { text: "Sauerkraut", correct: false },
      { text: "Kimchi", correct: true },
      { text: "Coleslaw", correct: false },
      { text: "Pickled Cabbage", correct: false },
  ],
  },
  {
  q: "What type of nut is added to chocolate to make Nutella?",
  ans: [
      { text: "Almonds", correct: false },
      { text: "Peanuts", correct: false },
      { text: "Cocoa", correct: false },
      { text: "Hazlenut", correct: true },
  ],
  },
  {
  q: "What cooking oil is the most widely used food in India, apart from wheat and rice?",
  ans: [
      { text: "Ghee", correct: true },
      { text: "Sunflower", correct: false },
      { text: "Almond", correct: false },
      { text: "Palm", correct: false },
  ],
  },
  
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let s = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  s = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.q;

  currentQuestion.ans.forEach((ans) => {
    const button = document.createElement("button");
    button.innerHTML = ans.text;
    button.classList.add("btn2");
    answerButtons.appendChild(button);
    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    s+=1;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${s} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();