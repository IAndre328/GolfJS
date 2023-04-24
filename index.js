const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')
canvas.style.display = 'grid'
canvas.style.alignItems = 'center'

let velocidade = 0
let tacada = true


canvas.width = 1024
canvas.height = 512

c.fillStyle = 'green'
c.fillRect(0,0,canvas.width,canvas.height)
c.fillStyle = 'red'



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
 let wall1
const paredes = new walls({
    
        position:{
            x: 100,
            y:100,
        },
        color:'red',
        width: 100,
        height: 50
    }
)
const ball = new sprite({
    position:{
        x: canvas.width/2,
        y: canvas.height-50
    },
    color:'white',
    radius: 10,
    velocidade:0.2,
})


const hole = new sprite({
    position:{
        x: canvas.width/2,
        y: 50
    },
    color:'black',
    radius: 20,
})

  

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'green'
    c.fillRect(0,0,canvas.width,canvas.height)
    ball.draw()
    hole.draw()
    paredes.draw()
    
}
animate()


const logMouseMove = (e) => {
	e = e || window.event;	
	mousePos = { x: e.clientX, y: e.clientY };
	// console.log(mousePos)
    
}



const mouseDown = () => {
   console.log('teste')
    
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
        console.log(velocidade)
      if(velocidade >= 20) {
        clearInterval(acelerar)

       let frear = setInterval(function(){
        velocidade-=2
        ball.position.y -= velocidade
        console.log(velocidade)
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
        mousePos.x >= ball.position.x
        && mousePos.x <= ball.position.x + ball.radius*2
        && mousePos.y >= ball.position.y
        && mousePos.y <= ball.position.y + ball.radius*2
        ){
        mouseDown()
    }
    
}



window.onmousemove = logMouseMove;


//win

if(
    ball.position.x + ball.radius*2 - hole.position.x + hole.radius*2 <= 20 && 
    ball.position.x - hole.position.x >= 0 &&
    ball.position.y - hole.position.y <= 20 &&
    ball.position.y - hole.position.y >= 0
    ){
    console.log(`alegria`)
}
