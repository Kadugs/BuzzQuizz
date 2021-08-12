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
        <li onclick="abrirQuizz(this, '${todosQuizzes[i].title}')">
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

let quizzEspecifico = {};
// abre a paginaQuizz com o quizz selecionado respectivo
function abrirQuizz(elemento, tituloQuizz){
    const listaQuizzes = document.querySelector(".lista-quizzes");
    listaQuizzes.classList.add("escondido");
    const paginaQuizz = document.querySelector(".pagina-quizz");
    paginaQuizz.classList.remove("escondido");
    
    for(let i=0; i<todosQuizzes.length; i++){
        if(tituloQuizz === todosQuizzes[i].title){
            quizzEspecifico = todosQuizzes[i];
        }
    } 
    
    renderizarQuizz();
   
}
function renderizarQuizz(){
    const mudaTopo = document.querySelector(".pagina-quizz .topo-quizz");
   
    mudaTopo.style.backgroundImage = `url("${quizzEspecifico.image}")`;
    mudaTopo.innerHTML = `${quizzEspecifico.title}`;
   
    const inserePerguntas = document.querySelector(".pagina-quizz ul");
    inserePerguntas.innerHTML = ``;
    for(let i=0; i < quizzEspecifico.questions.length; i++){
        const pergunta = quizzEspecifico.questions[i];
        inserePerguntas.innerHTML += `
            <li class="pergunta-quizz-conteiner">
                <div class="pergunta-quizz azul">
                    <strong> ${pergunta.title}</strong>
                </div>
                <div class="respostas-conteiner">
                </div>
            </li> 
        `;
    }
}

let titulo;
let imagem;

function criarQuizzComeco() {
    listaQuizzes.classList.add('escondido');
    telaCriarComeco.classList.remove('escondido');
}
function criarQuizzPerguntas() {
    let dadosComeco = document.querySelectorAll('.criar-quizz-comeco li input');
    titulo = dadosComeco[0].value;
    imagem = dadosComeco[1].value;
    const numPerguntas = Number(dadosComeco[2].value);
    const numNiveis = Number(dadosComeco[3].value);
    telaCriarComeco.classList.add('escondido');
    telaCriarPerguntas.classList.remove("escondido");
}
function criarQuizzNiveis() {
    telaCriarPerguntas.classList.add("escondido");
    telaCriarFinal.classList.remove("escondido");
}
function acessarQuizz() {
}

const novoQuizz = {
	title: titulo,
	image: imagem,
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		}
	]
}