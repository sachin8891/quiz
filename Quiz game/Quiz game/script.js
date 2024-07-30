const questions = [
    {
        question: 'What is the capital city of india?',
        answers: [
            { text: 'Delhi', correct: true},
            { text: 'Rajasthan', correct: false },
            { text: 'Gujarat', correct: false },
            { text: 'Hyderabad', correct: false }
        ]
    },
    {
        question: 'Which city is known as the pink city of india ',
        answers: [
            { text: 'Jaipur', correct: true },
            { text: 'Delhi', correct: false },
            { text: 'Kota', correct: false },
            { text: 'Chandigarh', correct: false }
        ]
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: [
            { text: 'Harper Lee', correct: true },
            { text: 'Jane Austen', correct: false },
            { text: 'Mark Twain', correct: false },
            { text: 'Ernest Hemingway', correct: false }
        ]
    },
    {
        question: 'who is the king of bollywood industry in india ?',
        answers: [
            {text: 'Sunil Shetty', correct: false},
            {text: 'Akshay Kumar', correct: false},
            {text: 'Sharukh Khan', correct: true},
            {text: 'Salman Khan', correct: false},
        ] 
    },
    { question: 'who is the best finisher in the world cricket ?',
        answers: [
            {text: 'Virat Kohli', correct: false},
            {text: 'Tim Southee', correct: false},
            {text: 'Rohit Sharma', correct: false},
            {text: 'Mahendra Singh Dhoni ', correct: true},
        ]  
    },
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex, score;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    nextButton.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.style.display = 'none';
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) score++;
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.add(button.dataset.correct === 'true' ? 'correct' : 'incorrect');
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener('click', startQuiz);

function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultElement.innerText = `You scored ${score} out of ${questions.length}!`;
}

startQuiz();
