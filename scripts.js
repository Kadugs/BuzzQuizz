let todosQuizzes = {};

const listaQuizzes = document.querySelector(".lista-quizzes");
const telaCriarComeco = document.querySelector(".criar-quizz-comeco");
const telaCriarPerguntas = document.querySelector(".criar-quizz-perguntas");
const telaCriarNiveis = document.querySelector(".criar-quizz-niveis");
const telaCriarFinal = document.querySelector(".criar-quizz-final");

// leitura de quizzes no servidor
function buscarQuizzes(){
    const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes');
    promessa.then(processarQuizzes);
}
buscarQuizzes();

function processarQuizzes(resposta){
    todosQuizzes = resposta.data;
    renderizarQuizzes();
}

function renderizarQuizzes(){
    
    const quizzes = document.querySelector(".todos-os-quizzes ul");
    quizzes.innerHTML = '';
    for(let i=0; i<todosQuizzes.length; i++){
        quizzes.innerHTML += `
        <li>
            <div class="degrade">
                <span>${todosQuizzes[i].title}</span>
            </div>
        </li>`
    }
    let quiz = document.querySelector(".todos-os-quizzes ul li");
    for(let i=0; i<todosQuizzes.length; i++){
        quiz.style.backgroundImage = `url("${todosQuizzes[i].image}")`;
        quiz = quiz.nextElementSibling;
    }
}

function criarQuizzComeco() {
    listaQuizzes.classList.add('escondido');
    telaCriarComeco.classList.remove('escondido');
}
function criarQuizzPerguntas() {
    telaCriarComeco.classList.add('escondido');
    telaCriarPerguntas.classList.remove("escondido");
}
function criarQuizzNiveis() {
    telaCriarPerguntas.classList.add("escondido");
    telaCriarFinal.classList.remove("escondido");
}
function acessarQuizz() {

}