const listaQuizzes = document.querySelector(".lista-quizzes");
const telaCriarComeco = document.querySelector(".criar-quizz-comeco");
const telaCriarPerguntas = document.querySelector(".criar-quizz-perguntas");
const telaCriarNiveis = document.querySelector(".criar-quizz-niveis");
const telaCriarFinal = document.querySelector(".criar-quizz-final");
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