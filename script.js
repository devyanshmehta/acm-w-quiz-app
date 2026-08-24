const questions = [
  {
    q: "What does ACM stand for?",
    options: ["Association for Computing Machinery", "American Computer Management", "Association of Computer Managers", "Advanced Computing Machine"],
    answer: 0,
    explain: "ACM stands for Association for Computing Machinery."
  },
  {
    q: "What is ACM-W primarily focused on?",
    options: ["Supporting women in computing", "Building computer hardware", "Selling software licenses", "Operating internet services"],
    answer: 0,
    explain: "ACM-W supports, celebrates, and advocates for women in computing."
  },
  {
    q: "Which of these is an example of Artificial Intelligence?",
    options: ["A recommendation system suggesting videos", "A printed textbook", "A USB cable", "A keyboard key"],
    answer: 0,
    explain: "Recommendation systems can use AI/ML to predict what a user may prefer."
  },
  {
    q: "What is Machine Learning?",
    options: ["A method where systems learn patterns from data", "A type of computer monitor", "A programming keyboard", "A file compression format"],
    answer: 0,
    explain: "Machine learning enables systems to learn patterns from data rather than relying only on explicitly written rules."
  },
  {
    q: "Which language is commonly used for AI and data science?",
    options: ["Python", "HTML", "CSS", "XML"],
    answer: 0,
    explain: "Python is widely used for AI, machine learning, and data science."
  },
  {
    q: "What is an algorithm?",
    options: ["A step-by-step procedure for solving a problem", "A computer screen", "A database password", "A hardware component"],
    answer: 0,
    explain: "An algorithm is a defined sequence of steps used to solve a problem or perform a task."
  },
  {
    q: "Which field helps computers understand human language?",
    options: ["Natural Language Processing", "Computer Graphics", "Operating Systems", "Networking"],
    answer: 0,
    explain: "Natural Language Processing (NLP) deals with processing and understanding human language."
  },
  {
    q: "What does a dataset contain?",
    options: ["A collection of data", "Only computer programs", "Only images", "Only passwords"],
    answer: 0,
    explain: "A dataset is an organized collection of data used for analysis, training, testing, or other purposes."
  },
  {
    q: "What is a neural network inspired by?",
    options: ["The structure of biological brains", "Internet cables", "Computer batteries", "File systems"],
    answer: 0,
    explain: "Artificial neural networks are loosely inspired by networks of neurons in biological brains."
  },
  {
    q: "Which is an important principle when developing responsible AI?",
    options: ["Fairness and reducing harmful bias", "Ignoring testing", "Hiding system limitations", "Using as much data as possible without review"],
    answer: 0,
    explain: "Responsible AI considers fairness, safety, privacy, transparency, and other potential harms."
  },
  {
    q: "What is the main purpose of testing a model on unseen data?",
    options: ["To evaluate how well it generalizes", "To increase screen brightness", "To rename the dataset", "To install an operating system"],
    answer: 0,
    explain: "Unseen test data helps measure how well a model generalizes beyond its training examples."
  },
  {
    q: "Which ACM-W activity can help students interested in computing careers?",
    options: ["Networking and community-building opportunities", "Replacing all university courses", "Manufacturing laptops", "Running a search engine"],
    answer: 0,
    explain: "ACM-W supports community, networking, mentoring, and opportunities for women in computing."
  },
  {
    q: "What is supervised learning?",
    options: ["Learning from labeled examples", "Learning with no data", "Only learning from hardware", "Deleting training examples"],
    answer: 0,
    explain: "Supervised learning uses labeled examples to learn a mapping from inputs to expected outputs."
  },
  {
    q: "What does 'AI' stand for?",
    options: ["Artificial Intelligence", "Automated Internet", "Advanced Interface", "Applied Information"],
    answer: 0,
    explain: "AI stands for Artificial Intelligence."
  },
  {
    q: "Why is a responsive UI important for a web quiz?",
    options: ["It makes the app usable across different screen sizes", "It guarantees every answer is correct", "It replaces JavaScript", "It removes the need for questions"],
    answer: 0,
    explain: "Responsive design adapts the interface to phones, tablets, and desktops."
  }
];

let current = 0;
let score = 0;
let selected = null;
let userAnswers = [];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const questionBox = document.getElementById("questionBox");
const progressText = document.getElementById("progressText");
const scoreLive = document.getElementById("scoreLive");
const progressBar = document.getElementById("progressBar");
const nextBtn = document.getElementById("nextBtn");
const finalScore = document.getElementById("finalScore");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const reviewBox = document.getElementById("reviewBox");
const scoreRing = document.querySelector(".score-ring");

function renderQuestion() {
  selected = null;
  nextBtn.disabled = true;
  const item = questions[current];
  progressText.textContent = `Question ${current + 1} of ${questions.length}`;
  scoreLive.textContent = `${score} correct`;
  progressBar.style.width = `${((current) / questions.length) * 100}%`;

  questionBox.innerHTML = `
    <div class="question-number">Question ${current + 1}</div>
    <div class="question">${item.q}</div>
    <div class="options">
      ${item.options.map((option, i) => `
        <button class="option" data-index="${i}">
          <span class="letter">${String.fromCharCode(65 + i)}</span>
          <span>${option}</span>
        </button>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selected = Number(btn.dataset.index);
      nextBtn.disabled = false;
    });
  });

  nextBtn.textContent = current === questions.length - 1 ? "Finish Quiz" : "Next Question";
}

function finishQuiz() {
  progressBar.style.width = "100%";
  finalScore.textContent = `${score}/${questions.length}`;
  const percent = Math.round((score / questions.length) * 100);
  scoreRing.style.setProperty("--score", `${percent}%`);

  if (percent >= 80) {
    resultTitle.textContent = "Excellent work!";
    resultMessage.textContent = "You have a strong grasp of the ACM-W and AI basics covered in this quiz.";
  } else if (percent >= 60) {
    resultTitle.textContent = "Good job!";
    resultMessage.textContent = "You have a solid foundation. Review the explanations below to strengthen it further.";
  } else {
    resultTitle.textContent = "Keep learning!";
    resultMessage.textContent = "Nice attempt. Use the answer review to identify the concepts worth revisiting.";
  }

  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

document.getElementById("startBtn").addEventListener("click", () => {
  current = 0;
  score = 0;
  userAnswers = [];
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  if (selected === null) return;
  userAnswers.push(selected);
  if (selected === questions[current].answer) score++;
  current++;
  if (current < questions.length) renderQuestion();
  else finishQuiz();
});

document.getElementById("restartBtn").addEventListener("click", () => {
  startScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
  reviewBox.classList.add("hidden");
  reviewBox.innerHTML = "";
});

document.getElementById("reviewBtn").addEventListener("click", () => {
  reviewBox.classList.toggle("hidden");
  if (!reviewBox.classList.contains("hidden")) {
    reviewBox.innerHTML = questions.map((item, i) => {
      const chosen = userAnswers[i];
      const correct = chosen === item.answer;
      return `
        <div class="review-item">
          <strong>${i + 1}. ${item.q}</strong>
          <div class="${correct ? "correct" : "wrong"}">
            Your answer: ${item.options[chosen] || "Not answered"} ${correct ? "✓" : "✗"}
          </div>
          ${correct ? "" : `<div class="correct">Correct answer: ${item.options[item.answer]} ✓</div>`}
          <div style="color:#697386;margin-top:5px">${item.explain}</div>
        </div>
      `;
    }).join("");
  }
});
