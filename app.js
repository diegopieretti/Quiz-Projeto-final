import { questions } from "./questions.js";

let selectedCategory = null;
let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;

// DOM Elements
const categoriesEl = document.getElementById("categories");
const quizEl = document.getElementById("quiz");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const restartBtn = document.getElementById("restart-btn");

// Carrega as categorias na tela inicial
function loadCategories() {
  categoriesEl.innerHTML = "";
  Object.keys(questions).forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.toUpperCase();
    button.addEventListener("click", () => startQuiz(category));
    categoriesEl.appendChild(button);
  });
}

// Inicia o quiz com a categoria selecionada
function startQuiz(category) {
  selectedCategory = category;
  selectedQuestions = [...questions[category]].sort(() => Math.random() - 0.5).slice(0, 5);
  currentQuestion = 0;
  score = 0;
  categoriesEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  loadQuestion();
}

// Carrega a pergunta atual
function loadQuestion() {
  const current = selectedQuestions[currentQuestion];
  questionEl.textContent = current.pergunta; // Modificado para acessar "pergunta"
  optionsEl.innerHTML = "";

  current.respostas.forEach((resposta, index) => { // Modificado para acessar "respostas"
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = resposta;
    button.addEventListener("click", () => checkAnswer(index));
    optionsEl.appendChild(button);
  });

  nextBtn.classList.add("hidden");
}

// Verifica a resposta
function checkAnswer(selected) {
  const correct = selectedQuestions[currentQuestion].respostaCorreta; // Modificado para acessar "respostaCorreta"
  if (selected === correct) {
    score++;
  }
  document.querySelectorAll(".option").forEach((button, index) => {
    button.disabled = true;
    button.style.background = index === correct ? "#28a745" : "#dc3545";
  });
  nextBtn.classList.remove("hidden");
}

// Mostra o resultado final
function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = score;
  totalEl.textContent = selectedQuestions.length;
}

// Reinicia o quiz
function restartQuiz() {
  location.reload();
}

// Configura os botões
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < selectedQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", restartQuiz);

// Inicializa a tela inicial
loadCategories();
