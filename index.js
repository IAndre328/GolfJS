const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')
canvas.style.display = 'grid'
canvas.style.alignItems = 'center'

let velocidade = 0
let tacada = true
let gameWon = false



canvas.width = 1024
canvas.height = 512

c.fillStyle = 'green'
c.fillRect(0,0,canvas.width,canvas.height)




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
        y: canvas.height-50
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

const desenharSprites = () =>{
    ball.draw()
    hole.draw()
    for (i=0;i<paredes.length;i++){
        paredes[i].draw()
    }
}

const logMouseMove = (e) => {
	e = e || window.event
	mousePos = { x: e.clientX, y: e.clientY }
}

window.onmousemove = logMouseMove

const mouseDown = () => {
canvas.addEventListener('mouseup',()=>{
    if (tacada){
        mouseUp()
    }
})
}

function mouseUp(){
    

   tacada = false
    //Acelera
    let acelerar = setInterval(function(){
      velocidade+=5
      ball.position.y -= velocidade
    //   console.log(ball.position)
      if(velocidade >= 20) {
        clearInterval(acelerar)

       let frear = setInterval(function(){
        velocidade-=2
        ball.position.y -= velocidade
        // console.log(ball.position)
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
    if (ball.position.y <= paredes[1].position.y + paredes[1].height) {
        console.log("alegria")
    }
}


//win
const win = () => {
     if(
        ball.position.y <= hole.position.y + hole.radius &&
        ball.position.x <= hole.position.x &&
        ball.position.y >= hole.position.y - hole.radius
        ){
        console.log(`bola no buraco`)
        gameWon = true    
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'green'
    c.fillRect(0,0,canvas.width,canvas.height)
    if (!gameWon){
        desenharSprites()
       win()
      colisao()
    }
}



// menu

function menu(){
    const menuIniciar = {
        corFundo:'rgb(156, 42, 13)',
        corBorda:'rgb(109, 22, 0)',
        x: canvas.width/2,
        y: canvas.height/2-100,
        width: 175,
        height: 75,
    }
  c.beginPath()
  c.fillStyle = menuIniciar.corFundo
  c.strokeStyle = menuIniciar.corBorda
  c.moveTo(menuIniciar.x,menuIniciar.y)
  c.lineTo(menuIniciar.y,menuIniciar.y + menuIniciar.height)
  c.lineTo(menuIniciar.y + menuIniciar.height, menuIniciar)
  c.closePath()
  c.stroke()
  c.fill()
  
    
}
window.onload = menu()

