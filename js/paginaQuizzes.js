let todosQuizzes = {};
const paginaQuizz = document.querySelector(".pagina-quizz");



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
    console.log(todosQuizzes);
    for(let i=0; i<todosQuizzes.length; i++){
        quizzes.innerHTML += `
        <li onclick="abrirQuizz(this, ${todosQuizzes[i].id})">
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

function abrirQuizz(elemento, idQuizz){
   
    listaQuizzes.classList.add("escondido");
    
    paginaQuizz.classList.remove("escondido");
    
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/" +idQuizz);
    promessa.then(processarQuizz);
    
}
function processarQuizz(resposta){
    quizzEspecifico = resposta.data;
    console.log(resposta.data);
    renderizarQuizz();
}

function renderizarQuizz(){
    const mudaTopo = document.querySelector(".pagina-quizz .topo-quizz");
    mudaTopo.style.backgroundImage = `url("${quizzEspecifico.image}")`;
    
    const mudaTextoTopo = document.querySelector(".pagina-quizz .topo-quizz p")
    mudaTextoTopo.innerHTML = `${quizzEspecifico.title}`;
   
    const inserePerguntas = document.querySelector(".pagina-quizz ul");
    inserePerguntas.innerHTML = ``;
    for(let i=0; i < quizzEspecifico.questions.length; i++){
        const pergunta = quizzEspecifico.questions[i];
        inserePerguntas.innerHTML += `
            <li class="pergunta-quizz-conteiner">
                <div class="pergunta-quizz azul">
                    <p><strong> ${pergunta.title}</strong></p>
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
        let respostas = pergunta.answers;
        respostas.sort(embaralharRespostas);
        for(let j = 0; j<respostas.length; j++){
            if(respostas[j].isCorrectAnswer){
                resposta.innerHTML += `
                    <div class="opcao-resposta resposta-correta esconder" onclick="marcarResposta(this, ${respostas.length})">
                        <img src="${respostas[j].image}">
                        <p><strong>${respostas[j].text}</strong></p>
                    </div>
            `;
            } else{
                resposta.innerHTML += `
                    <div class="opcao-resposta resposta-incorreta esconder" onclick="marcarResposta(this, ${respostas.length})">
                        <img src="${respostas[j].image}">
                        <p><strong>${respostas[j].text}</strong></p>
                    </div>
            `;
            }
            
        }
        insereRespostas = insereRespostas.nextElementSibling;
    }
    window.scrollTo(0,0);
    
}

// para marcar as respostas e mostrar se acertou ou errou

function marcarResposta(elemento, numRespostas){
    let respostas = elemento.parentNode.firstElementChild;
    console.log(respostas);
    for(let i=0; i < numRespostas; i++){
        respostas.classList.remove("esconder");
        respostas = respostas.nextElementSibling;
    }
    elemento.classList.add("marcado");
    
}


function embaralharRespostas() { 
	return Math.random() - 0.5; 
}

function reiniciarQuizz(){
    renderizarQuizz();
    window.scrollTo(0,0);
}

function voltarHome(){  
    window.location.reload();
}