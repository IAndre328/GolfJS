// Variáveis globais
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mousePos = { x: 0, y: 0 };

// Configurações iniciais
let velocidade = { x: 3, y: 3 };
let angulo = 0;
let i = 0;
let tacada = true;
let gameWon = false;

// Função para preencher o canvas com verde
const telaVerde = () => {
    c.fillStyle = 'green';
    c.fillRect(0, 0, canvas.width, canvas.height);
};

// Classe para desenhar elementos circulares
class Sprite {
    constructor({ position, color, radius }) {
        this.position = position;
        this.color = color;
        this.radius = radius;
    }

    draw() {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fill();
    }
}

// Classe para desenhar paredes retangulares
class Wall {
    constructor({ position, color, width, height }) {
        this.position = position;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// Elementos do menu
const voltar = document.createElement("div");
const jogar = document.createElement("div");
const opcoes = document.createElement("div");

// Função para exibir o título
const title = () => {
    let fontSize = 150;
    let maxwidth = canvas.width / 100 * 50;
    c.fillStyle = "yellow";
    c.font = `${fontSize}px Century`;
    c.textAlign = "center";
    c.fillText("GolfJs", canvas.width / 2, canvas.height / 100 * 20, maxwidth);
};

// Função para declarar o menu
function declararMenu() {
    telaVerde();
    title();

    voltar.classList.add("caixas");
    jogar.classList.add("caixas");
    opcoes.classList.add("caixas");

    voltar.id = "voltar";
    jogar.id = "jogar";
    opcoes.id = "opcoes";

    voltar.innerHTML = `<img src="./img/download.png" alt="Voltar">`;
    voltar.addEventListener("click", menu);

    jogar.onclick = animate;
    jogar.textContent = "Jogar";

    opcoes.onclick = menuOpcoes;
    opcoes.textContent = "Opções";

    menu();
}

// Função para exibir o menu
function menu() {
    cancelAnimationFrame(animate) || null;

    telaVerde();
    title();
    let canvasContainer = document.querySelector("#canvas-container");
    canvasContainer.append(voltar);
    canvasContainer.appendChild(opcoes);
    canvasContainer.appendChild(jogar);
}

// Função para exibir as opções do menu
function menuOpcoes() {
    removerElemento(jogar);
    removerElemento(opcoes);
}

// Função para remover um elemento do DOM
function removerElemento(elemento) {
    elemento.remove();
}

// Elementos do jogo
const wall1 = new Wall({
    position: { x: 100, y: 100 },
    color: 'red',
    width: 100,
    height: 50
});

const wall2 = new Wall({
    position: { x: canvas.width / 2, y: canvas.height / 4 },
    color: 'red',
    width: 100,
    height: 50
});

const paredes = [wall1, wall2];

const ball = new Sprite({
    position: { x: canvas.width / 2, y: canvas.height / 100 * 80 },
    color: 'white',
    radius: 15
});

const hole = new Sprite({
    position: { x: canvas.width / 2, y: 50 },
    color: 'black',
    radius: 30
});

const sprites = [ball, hole];

// Função para desenhar os elementos na tela
function desenharSprites() {
    sprites.forEach(element => {
        element.draw();
    });

    paredes.forEach(element => {
        element.draw();
    });
}

// Função para capturar o movimento do mouse
function logMouseMove(e) {
    e = e || window.event;
    let rect = canvas.getBoundingClientRect();
    mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function verificarSeEncostou(elemento1,elemento2,tamanhoElemento2){
    return (
    elemento1.x >= elemento2.position.x - elemento2[tamanhoElemento2] &&
    elemento1.x <= elemento2.position.x + elemento2[tamanhoElemento2] &&
    elemento1.y >= elemento2.position.y - elemento2[tamanhoElemento2] &&
    elemento1.y <= elemento2.position.y + elemento2[tamanhoElemento2] 
    )
    
}


// Função de animação principal
function animate() {
    telaVerde();
    removerElemento(jogar);
    removerElemento(opcoes);
    if (!gameWon) {
        requestAnimationFrame(animate);
        desenharSprites();
       
    }
}

function mousedown(){
    let posInicial = mousePos;
}




// Eventos de clique e movimento do mouse
canvas.addEventListener("click",()=>{
    
   if(verificarSeEncostou(mousePos,ball,'radius'))mousedown()
})
window.onmousemove = logMouseMove;

// Inicialização após o carregamento da página
window.onload = declararMenu;
