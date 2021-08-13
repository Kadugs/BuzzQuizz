const listaQuizzes = document.querySelector(".lista-quizzes");
const telaCriarComeco = document.querySelector(".criar-quizz-comeco");
const telaCriarPerguntas = document.querySelector(".criar-quizz-perguntas");
const telaCriarNiveis = document.querySelector(".criar-quizz-niveis");
const telaCriarFinal = document.querySelector(".criar-quizz-final");
let titulo;
let urlImagem;
let numPerguntas;
let numNiveis;
let perguntas = [];
function adicionaInfosBasicas() {
    const dadosComeco = document.querySelectorAll('.criar-quizz-comeco li input');
    titulo = dadosComeco[0].value;
    urlImagem = dadosComeco[1].value;
    numPerguntas = Number(dadosComeco[2].value);
    numNiveis = Number(dadosComeco[3].value);
}
function adicionaInfosPerguntas() {
    for(let i = 0; i < numPerguntas; i++) {
        let grupoPerguntas = document.getElementById(`pergunta${i + 1}`);
        perguntas[i] = {
            title: grupoPerguntas.querySelector('li:nth-child(2) input').value,
            color: grupoPerguntas.querySelector('li:nth-child(3) input').value,
            answers: [
                {
                    text: grupoPerguntas.querySelector('li:nth-child(5) input').value,
                    image: grupoPerguntas.querySelector('li:nth-child(6) input').value,
                    isCorrectAnswer: true
                },
                {
                    text: grupoPerguntas.querySelector('li:nth-child(8) input').value,
                    image: grupoPerguntas.querySelector('li:nth-child(9) input').value,
                    isCorrectAnswer: false
                }
            ]
        }
        if(grupoPerguntas.querySelector('li:nth-child(10) input').value !== "") {
            perguntas[i].answers.push({
                text: grupoPerguntas.querySelector('li:nth-child(10) input').value,
                image: grupoPerguntas.querySelector('li:nth-child(11) input').value,
                isCorrectAnswer: false
            })
        }
        if(grupoPerguntas.querySelector('li:nth-child(12) input').value !== "") {
            perguntas[i].answers.push({
                text: grupoPerguntas.querySelector('li:nth-child(12) input').value,
                image: grupoPerguntas.querySelector('li:nth-child(13) input').value,
                isCorrectAnswer: false
            })
        }
    }
}

function criarQuizzComeco() {
    listaQuizzes.classList.add('escondido');
    telaCriarComeco.classList.remove('escondido');
}
function criarQuizzPerguntas() {
    adicionaInfosBasicas();
    /*if(titulo.length >= 20 && titulo.length <= 65 && urlImagem.indexOf("https://") !== -1 && numPerguntas >= 3 && numNiveis >= 2) {
        telaCriarComeco.classList.add('escondido');
        telaCriarPerguntas.classList.remove("escondido");
        renderizarAdicaoPergunta('ul', 1);
    } else {
        alert('Erro!');
    }*/
    renderizarAdicaoPergunta('ul', 1);
    telaCriarComeco.classList.add('escondido');
    telaCriarPerguntas.classList.remove("escondido");
}
function criarQuizzNiveis() {
    adicionaInfosPerguntas();
    telaCriarPerguntas.classList.add("escondido");
    telaCriarNiveis.classList.remove("escondido");
}
function acessarQuizz() {
}

function renderizarAdicaoPergunta(item, num) {
    document.getElementById(`pergunta${num}`).innerHTML +=
    `<ul>
    <li class="subtitulo-criar-quizz"><strong> Pergunta ${num}</strong></li>
    <li><input type="text" placeholder="Texto da pergunta" required></li>
    <li><input type="text" placeholder="Cor de fundo da pergunta" required></li>

    <li class="subtitulo-criar-quizz"><strong> Resposta correta</strong></li>
    <li><input type="text" placeholder="Resposta correta" required></li>
    <li><input type="text" placeholder="URL da imagem" required></li>

    <li class="subtitulo-criar-quizz"><strong> Respostas incorretas</strong></li>
    <li><input type="text" placeholder="Resposta incorreta 1" required></li>
    <li class="respiro-li"><input type="text" placeholder="URL da imagem 1" required></li>

    <li><input type="text" placeholder="Resposta incorreta 2" required></li>
    <li class="respiro-li"><input type="text" placeholder="URL da imagem 2" required></li>

    <li><input type="text" placeholder="Resposta incorreta 3" required></li>
    <li><input type="text" placeholder="URL da imagem 3" required></li>
    </ul>`
    if(num > 1) {
        item.parentNode.classList.add('escondido');
    }
}
function enviaQuizz() {
    const novoQuizz = {
        title: titulo,
        image: urlImagem,
        questions: perguntas,
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            }
        ]
    }
}