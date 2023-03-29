const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

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
        c.fill();
    }
}

let mouseClickado

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

  

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'green'
    c.fillRect(0,0,canvas.width,canvas.height)
    ball.draw()
    hole.draw()
    
}
animate()
window.onmousemove = logMouseMove;


function logMouseMove(e) {
	e = e || window.event;	
	const mousePos = { x: e.clientX, y: e.clientY };
	console.log(mousePos)
    
}

function mouseUp(){
    mouseClickado = false
    console.log(mouseClickado)
}

function mouseDown(){
    mouseClickado = true
   console.log(mouseClickado)
}
window.onmousedown = mouseDown
window.onmouseup = mouseUp
console.log(mousePos)
if (
    mousePos.x >= ball.position.x && 
    mousePos.x <= ball.position.x + ball.radius*2 &&
    mouseClickado === true
    ){
    movimentarBola
}

function movimentarBola(){
    console.log('Movimentar Bola')
}