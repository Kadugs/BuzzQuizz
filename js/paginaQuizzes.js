let todosQuizzes = {};

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
    let insereRespostas = document.querySelector(".pagina-quizz ul li");
    
    for(let i=0; i < quizzEspecifico.questions.length; i++){
        const resposta = insereRespostas.lastElementChild;
        resposta.innerHTML = ``;
        const pergunta = quizzEspecifico.questions[i];
        for(let j = 0; j<pergunta.answers.length; j++){
            resposta.innerHTML += `
                    <div class="opcao-resposta">
                        <img src="${pergunta.answers[j].image}">
                        <p>${pergunta.answers[j].text}</p>
                    </div>
            `;
        }
        insereRespostas = insereRespostas.nextElementSibling;
    }
}