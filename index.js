let canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')
canvas.style.display = 'grid'
canvas.style.alignItems = 'center'

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
        c.fill()
    }
   
    
}



const ball = new sprite({
    position:{
        x: 512,
        y: canvas.height-50
    },
    color:'white',
    radius: 10,
})


const hole = new sprite({
    position:{
        x: 512,
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


function logMouseMove(e) {
	e = e || window.event;	
	mousePos = { x: e.clientX, y: e.clientY };
	// console.log(mousePos)
    
}



function mouseDown(){
//    console.log('teste')
   ball.position.y -= 10
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

if (
   ball.position.x >= hole.position.x &&
   ball.position.x <= hole.position.x + hole.radius*2
  
    ){
        console.log('gg')
}
