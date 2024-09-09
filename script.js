const quizData = [
    {
        question: "JavaScript hansı il icad olunub?",
        choices: ["1993", "1995", "1996", "2000"],
        correct: "1995",
    },
    {
        question: "HTML nə deməkdir?",
        choices: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperLoop Machine Language",
            "HyperText Main Language",
        ],
        correct: "HyperText Markup Language",
    },
    {
        question: "CSS nə üçün istifadə olunur?",
        choices: [
            "Strukturlaşdırma",
            "Stil vermə",
            "Məntiq qurma",
            "Məlumat saxlama",
        ],
        correct: "Stil vermə",
    },
    {
        question: "JavaScript-də hansı məlumat növü mövcuddur?",
        choices: ["String", "Number", "Boolean", "Hamısı"],
        correct: "Hamısı",
    },
    {
        question: "HTML-də bir düymə necə yaradılır?",
        choices: ["<button>", "<btn>", "<input>", "<düymə>"],
        correct: "<button>",
    },
    {
        question: "CSS-də necə rəng təyin etmək olar?",
        choices: ["color", "background-color", "font-color", "Hamısı"],
        correct: "Hamısı",
    },
    {
        question: "JavaScript-də DOM nə üçün istifadə olunur?",
        choices: ["Strukturlaşdırma", "Dinamik məzmun", "Əlaqə", "Bilmədim"],
        correct: "Dinamik məzmun",
    },
    {
        question: "JavaScript-də necə funksiya elan edilir?",
        choices: [
            "function myFunc()",
            "def myFunc()",
            "function:myFunc()",
            "fun myFunc()",
        ],
        correct: "function myFunc()",
    },
    {
        question: "CSS-də 'flexbox' nə üçün istifadə olunur?",
        choices: [
            "Elementlərin düzülüşünü idarə etmək",
            "Fon şəkli əlavə etmək",
            "Şriftin ölçüsünü dəyişmək",
            "Elementin görünməsini idarə etmək",
        ],
        correct: "Elementlərin düzülüşünü idarə etmək",
    },
    {
        question: "JavaScript-də 'for' dövrü nə üçün istifadə olunur?",
        choices: [
            "Dəyişən elan etmək",
            "Funksiya çağırmaq",
            "Döngü yaratmaq",
            "Array yaratmaq",
        ],
        correct: "Döngü yaratmaq",
    },
    {
        question: "HTML-də hansı başlıq elementi ən böyükdür?",
        choices: ["<h1>", "<h2>", "<h3>", "<h4>"],
        correct: "<h1>",
    },
    {
        question: "JavaScript-də hansı işarə məntiqi 'və' əməliyyatını göstərir?",
        choices: ["&&", "||", "==", "!="],
        correct: "&&",
    },
    {
        question: "CSS-də 'margin' nə üçün istifadə olunur?",
        choices: [
            "Elementin daxilində boşluq yaratmaq",
            "Elementin xaricində boşluq yaratmaq",
            "Fon rəngini dəyişmək",
            "Mətnin rəngini dəyişmək",
        ],
        correct: "Elementin xaricində boşluq yaratmaq",
    },
    {
        question: "JavaScript-də 'NaN' nə deməkdir?",
        choices: ["Number and Null", "Not a Number", "Null and NaN", "Not a Null"],
        correct: "Not a Number",
    },
    {
        question:
            "HTML-də şəkil əlavə etmək üçün hansı elementdən istifadə olunur?",
        choices: ["<img>", "<src>", "<pic>", "<image>"],
        correct: "<img>",
    },
];

const quiz = document.getElementById("quiz")
const question = document.getElementById("question")
const choices = document.getElementById("choices")
const timer = document.getElementById("timer")
const time = document.getElementById("time")
const startbtn = document.getElementById('start-btn')
const stopbtn = document.getElementById('stop-btn')
const contbtn = document.getElementById('continue-btn')
const nextbtn = document.getElementById('next-btn')
const restartbtn = document.getElementById('restart-btn')
const result = document.getElementById('result')

let t = 15
let pt = 15
let y = ''
let currentQuestionIndex = 0;
let score = 0;

function st() {
    clearInterval(y)
    time.innerHTML = t;
    y = setInterval(zaman, 1000);

    function zaman() {
        if (t > 0) {
            t -= 1;
        } else if (t == 0) { 
            nextQuestion();
        } else {
            clearInterval(y);
        }
        time.innerHTML = t;
    }
}

function show(index) {
    const currentQuestion = quizData[index];
    question.innerHTML = currentQuestion.question;

    let ch = "";
    currentQuestion.choices.forEach((choices) => {
        let choice = choices.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        ch += `<button class="choice" onclick="checkAnswer('${choice}', '${currentQuestion.correct}', this)">${choice}</button>`;
    });

    choices.innerHTML = ch;
}

function startQuiz() {
    st();
    show(currentQuestionIndex);

    startbtn.style.display = 'none';
    stopbtn.style.display = "inline-block";
    nextbtn.style.display = "inline-block";
}

function checkAnswer(selectedChoice, correctAnswer, btn) {
    clearInterval(y)

    const allButtons = document.querySelectorAll('.choice');
    allButtons.forEach(button => {
        button.disabled = true;
        button.style.cursor = 'not-allowed';
    });

    if (selectedChoice === correctAnswer) {
        btn.style.backgroundColor = 'green';
        score += 100;
    } else {
        btn.style.backgroundColor = 'red';
    }
}

function stopQuiz() {
    clearInterval(y)
    pt = t;
    contbtn.style.display = "inline-block";
    stopbtn.style.display = "none";
}

function continueQuiz() {
    t = pt
    st()
    contbtn.style.display = "none";
    stopbtn.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        t = 15;
        pt = 15;
        time.innerHTML = t;
        show(currentQuestionIndex);
        st();
    } else {
        showResult();
    }
}

function showResult() {
    quiz.style.display = 'none';
    restartbtn.style.display = 'inline-block';
    result.classList.remove('hidden');
    result.querySelector('h2')
    result.querySelector('p').innerHTML += `${score} / 1500`
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    t = 15;
    pt = 15;
    quiz.style.display = 'block';
    result.classList.add('hidden');
    startQuiz();
}