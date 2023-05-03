const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let velocidade = 0
let tacada = true
let gameWon = false
let mousePos = {
    x: 0,
    y: 0,
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const telaVerde = () =>{
    c.fillStyle = 'green'
    c.fillRect(0,0,canvas.width,canvas.height)
}


class sprite {
    constructor({position,color,radius}) {
        this.position = position
        this.color = color
        this.radius = radius 
    }

    draw(){
        c.fillStyle = this.color
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true); // Círculo exterior
        c.fill()
    }
}

class walls {
    constructor({position,color,width,height}){
        this.position = position
        this.color = color
        this.height = height
        this.width = width
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y,this.width,this.height)
    }
}

class menus {
    constructor({position,corFundo,corBorda,texto,func,width,height}){
        this.position = position
        this.corFundo = corFundo
        this.corBorda = corBorda
        this.texto = texto
        this.func = func
        this.width = width
        this.height = height
    }
    draw(){
        c.lineWidth = 5
        c.font = "30px Arial"

        c.fillStyle = this.corFundo
        c.strokeStyle = this.corBorda
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        c.strokeRect(this.position.x,this.position.y,this.width,this.height)


        c.fillStyle = "black"
        c.textAlign = "center"
        c.fillText(this.texto,this.position.x + this.width/2,this.position.y + this.height/100*60)
        
        
    }
    hover(){
        if (
            mousePos.x >= this.position.x &&
            mousePos.x <= this.position.x + this.width &&
            mousePos.y >= this.position.y &&
            mousePos.y <= this.position.y + this.height 
            ) {
            console.log('hover')
            
        }
        
    }
    click(){
            if (
                mousePos.x >= this.position.x &&
                mousePos.x <= this.position.x + this.width &&
                mousePos.y >= this.position.y &&
                mousePos.y <= this.position.y + this.height 
                ) {
                
                this.func()
                moveElements("out",menuIniciarOpcoes)
            }
        }
    
    }
    // menu
    const title = () =>{
    let fontSize = 150
    let maxwidth = canvas.width/100*50
    c.fillStyle = "yellow"
    c.font = `${fontSize}px Century`
    c.textAlign = "center"
    c.fillText("GolfJs",canvas.width/2,canvas.height/100*20,maxwidth)
    
    }
const menuIniciar = new menus ({
    corFundo:'rgb(156, 42, 13)',
    corBorda:'rgb(109, 22, 0)',
    width: 175,
    height: 75,
    position:{
        x: canvas.width/2 - 175/2,
        y: canvas.height/2-100,
    },
    texto: "Jogar",
    func: animate
})
const menuOpcoes = new menus({
corFundo:'rgb(156, 42, 13)',
corBorda:'rgb(109, 22, 0)',
width: 175,
height: 75,
position:{
    x: canvas.width/2 - 175/2,
    y: canvas.height/2 + 50,
},
texto: "Opções",
func: opcoes 
})

const menuIniciarOpcoes = [
menuIniciar,menuOpcoes
]


const menu = () => {
telaVerde()
title()
menuIniciar.draw()
menuOpcoes.draw()

canvas.onmousemove = () => {
    menuIniciar.hover()    
    menuOpcoes.hover()
}
canvas.onclick = () => {
    menuIniciar.click()
    menuOpcoes.click()
}


} 

const Opcoes = [
    'placeholder'
]
function opcoes(){
telaVerde()
}

const moveElements = (direcao,elements) => {
    if (direcao == "out") {
        elements.forEach(element => {
            if (element.position.x < canvas.width) { 
                element.position.x += canvas.width
            }
        })
    }
    if (direcao == "in") {
        elements.forEach(element => {
            if (element.position.x > canvas.width) { 
                element.position.x -= canvas.width
            }
        })
    }
}


 const wall1 = new walls({
        position:{
            x: 100,
            y:100,
        },
        color:'red',
        width: 100,
        height: 50
    }
)

const wall2 = new walls({
    position: {
        x: 500,
        y: 250,
    },
    color:'red',
    width:100,
    height:50
})

const paredes = [
    wall1,wall2,
]

const ball = new sprite({
    position:{
        x: canvas.width/2,
         y: canvas.height/100*80, 
    },
    color:'white',
    radius: 10,
})


const hole = new sprite({
    position:{
        x: canvas.width/2,
        y: 50
    },
    color:'black',
    radius: 20,
})

const sprites = [
    ball,hole
]

const desenharSprites = () =>{
    ball.draw()
    hole.draw()
    paredes.forEach(element => {
        element.draw()
    });
}

function logMouseMove(e)  {
	e = e || window.event
	 mousePos = { x: e.clientX, y: e.clientY }
}



const mouseDown = () => {
    
    let cordInicial = {
        x: mousePos.x,
        y: mousePos.y,
    }
    console.log(cordInicial)
canvas.addEventListener('mouseup',()=>{
    if (tacada){
        mouseUp(cordInicial)
    }
})
}

function mouseUp(cordInicial){
    tacada = false
    let cordsFinais = {
        x: mousePos.x - cordInicial.x,
        Y: mousePos.y - cordInicial.y,
    }
    let angulo = Math.atan2(cordsFinais.Y,cordsFinais.x)
    console.log(angulo)

    //Acelera
    let acelerar = setInterval(function(){
      velocidade+=5
      ball.position.y -= velocidade
    
      if(velocidade >= 20) {
        clearInterval(acelerar)

       let frear = setInterval(function(){
        velocidade-=2
        ball.position.y -= velocidade
        
        if (velocidade <= 0){
            clearInterval(frear)
            tacada = true
        }
       },30)  
      }
  }, 30)


    
}
    
       

canvas.onmousedown = () => {
    if (
        mousePos.x >= ball.position.x - ball.radius
        && mousePos.x <= ball.position.x + ball.radius*1.5
        && mousePos.y >= ball.position.y - ball.radius
        && mousePos.y <= ball.position.y + ball.radius*1.5
        ){
        mouseDown()
    }
    
}




// colisão
const colisao = () =>{
    paredes.forEach(Element => {
        if (ball.position.y <= Element.position.y + Element.height
            ) {
            
        }
    });  
}


//win
const win = () => {
     if(
        ball.position.y - hole.position.y + hole.radius <= 20 &&
        ball.position.x <= hole.position.x &&
        ball.position.y >= hole.position.y - hole.radius
        ){
        console.log(`bola no buraco`)
        gameWon = true 
        moveElements(sprites,paredes,"out")   
    }
}

function animate(){
    telaVerde()
    if (!gameWon){
        requestAnimationFrame(animate)
        desenharSprites()
        win()
        colisao()
    }
}


window.onload = menu()
window.onmousemove = logMouseMove
