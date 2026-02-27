let currentQuestionIndex = 0;
let questions = [];

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(error => console.error('Error loading the questions:', error));

function loadQuestion() {
  const questionData = questions[currentQuestionIndex];
  const questionContainer = document.getElementById('question-container');
  
  questionContainer.innerHTML = `
    <p>${questionData.question}</p >
    ${questionData.options ? questionData.options.map(option => `<button onclick="checkAnswer('${option}')">${option}</button>`).join('') : ''}
    ${questionData.image ? `< img src="${questionData.image}" alt="Image question">` : ''}
  `;
}

function checkAnswer(selectedOption) {
  const questionData = questions[currentQuestionIndex];
  if (Array.isArray(questionData.correctAnswer)) {
    if (questionData.correctAnswer.includes(selectedOption)) {
      alert('正确！' + questionData.explanation);
    } else {
      alert('错误！' + questionData.explanation);
    }
  } else {
    if (selectedOption === questionData.correctAnswer) {
      alert('正确！' + questionData.explanation);
    } else {
      alert('错误！' + questionData.explanation);
    }
  }
}

function nextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  loadQuestion();
}