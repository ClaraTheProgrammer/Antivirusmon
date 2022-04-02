var canvas = document.querySelector('canvas') //selects the canvas in the html
const c = canvas.getContext('2d') //canvas context

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height)

//creates a new image, of the pellet town
const image = new Image()
image.src='./images/Pellet Town.png'

//creates a new image of the player
const playerImg = new Image()
playerImg.src='./images/playerDown.png'

class Sprite{
    constructor({position, velocity, image}){
        this.position = position
        this.image = image
    }
    draw(){
        c.drawImage(this.image, -760, -660)
    }

}


const background = new Sprite({
    position:{
        x:-760,
        y:-660
    },
    image: image

})

const keys={
    w:{pressed:false},
    a:{pressed:false},
    s:{pressed:false},
    d:{pressed:false}
}

function animate(){
    window.requestAnimationFrame(animate)
    //loads the town first
    background.draw()
    c.drawImage(playerImg,
        0, //crop starting x pos
        0, //crop starting  y pos
        playerImg.width/4, //crop ending x pos
        playerImg.height,  //crop ending y pos
        canvas.width / 2 - (playerImg.width / 4) , //x pos of where to put the crop pic
        canvas.height/2 - playerImg.width / 2,  //y pos of where to put the crop pic
        playerImg.width/4, //width of the cropped pic
        playerImg.height   //height of the cropped pic
    )//loads the character second
    
    if(keys.w.pressed){


    }
}


animate()

//listens to the keyboard
window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed = true
            break

        case 'a':
            keys.a.pressed = true
            break

        case 's':
            keys.s.pressed = true
            break

        case 'd':
            keys.d.pressed = true
            break

    }
 
})
window.addEventListener('keyup', (e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 's':
            keys.s.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break

    }
})


