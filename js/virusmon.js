var canvas = document.querySelector('canvas') //selects the canvas in the html
const c = canvas.getContext('2d') //canvas context


canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for( let i = 0; i < collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZoneMap = []
for( let i = 0; i < battleZoneData.length; i+=70){
    battleZoneMap.push(battleZoneData.slice(i, 70 + i))
}

const offset = {
    x:-760,
    y:-650
}
const boundaries = []
const battleZones = []
collisionsMap.forEach((row,i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025){
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

battleZoneMap.forEach((row,i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025){
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

c.fillRect(0,0, canvas.width, canvas.height)

const image = new Image()//creates a new image, of the pellet town
image.src='./images/Pellet Town.png'

const foregroundImg = new Image()
foregroundImg.src='./images/foregroundObjects.png'

const playerDown = new Image() //creates a new image of the player
playerDown.src='./images/playerDown.png'

const playerUp = new Image() 
playerUp.src='./images/playerUp.png'

const playerLeft = new Image() 
playerLeft.src='./images/playerLeft.png'

const playerRight = new Image() 
playerRight.src='./images/playerRight.png'

const player = new Sprite({
    position: {
        x:canvas.width / 2 - (192 / 4),
        y:canvas.height/2 - 68 / 2
    },
    image: playerDown,
    frames:{
        max:4
    },
    sprites: {
        up:playerUp,
        down:playerDown,
        left:playerLeft,
        right:playerRight
    }
})
const background = new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image: image

})
const foreground = new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image: foregroundImg

})

const keys={
    w:{pressed:false},
    a:{pressed:false},
    s:{pressed:false},
    d:{pressed:false}
}

const movables = [background, ...boundaries, foreground, ...battleZones]

function rectangularCollision({rectangle1, rectangle2}){
    return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y&&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height)
}
const battle = {
    initiated: false
}

function animate(){
    const animationID = window.requestAnimationFrame(animate)
    console.log(animationID)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    battleZones.forEach(battleZone =>{
        battleZone.draw()
    })
    player.draw()
    foreground.draw()
    let moving = true
    player.moving = false
    if(battle.initiated) return
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for(let i = 0; i< battleZones.length; i++){
            const battleZone = battleZones[i]
            const overlappingArea = 
            (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) 
            - Math.max(player.position.x, battleZone.position.x)) 
            * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
            - Math.max(player.position.y, battleZone.position.y))

            if(rectangularCollision({
                rectangle1 : player,
                rectangle2: battleZone
                 
            })&& overlappingArea > ((player.width * player.height) /2) && Math.random()<.01) {
                console.log('battling')
                
                let hash;
                console.log(hash)
                let valid = false
                hash = prompt("Please enter a hash:", "2d75cc1bf8e57872781f9cd04a529256")
                console.log(hash)
                fetch(`http://localhost:3000/search/${hash}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json.valid)})
                        

                window.cancelAnimationFrame(animationID)
                // while (hash === null || hash === "" || valid === false) {
                //     hash = prompt("Please enter a hash:", "2d75cc1bf8e57872781f9cd04a529256")
                //     console.log(hash)
                //     fetch(`http://localhost:3000/search/${hash}`)
                //     .then(response => response.json())
                //     .then(json => {
                //         if(json.valid)
                //             valid = true
                //     })           
                // }
                battle.initiated = true
                gsap.to('#overlappingDiv',{
                    opacity:1,
                    repeat:3,
                    yoyo:true,
                    duration:0.4,
                    onComplete(){
                        gsap.to('#overlappingDiv',{
                            opacity:1,
                            duration:.04
                        })
                        //activate a new animation loop
                        //deactivate current animation loop
                    }
                })    
    
                break
            }
        }
    }
    
    if(keys.w.pressed && lastKey ==='w'){
        player.moving = true
        player.image = player.sprites.up
        for(let i = 0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1 : player,
                rectangle2: {...boundary, position:{
                    x: boundary.position.x,
                    y:  boundary.position.y+2
                }}
            })){
                console.log('colliding')
                moving = false
                break
            }
        }

        if(moving){
            movables.forEach((movable) =>{
                movable.position.y +=2
            })
        }
    }else if(keys.a.pressed && lastKey ==='a'){
        player.moving = true
        player.image = player.sprites.left
        for(let i = 0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1 : player,
                rectangle2: {...boundary, position:{
                    x: boundary.position.x+2,
                    y:  boundary.position.y
                }}
            })){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving){
            movables.forEach((movable) =>{
                movable.position.x +=2
            })
        }
    }else if(keys.s.pressed && lastKey ==='s'){
        player.moving = true
        player.image = player.sprites.down
        for(let i = 0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1 : player,
                rectangle2: {...boundary, position:{
                    x: boundary.position.x,
                    y:  boundary.position.y-2
                }}
            })){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving){
            movables.forEach((movable) =>{
                movable.position.y -=2
            })
        }
    }else if(keys.d.pressed && lastKey ==='d'){
        player.moving = true
        player.image = player.sprites.right
        for(let i = 0; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1 : player,
                rectangle2: {...boundary, position:{
                    x: boundary.position.x-2,
                    y:  boundary.position.y
                }}
            })){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving){
            movables.forEach((movable) =>{
                movable.position.x -=2
            })
        }
    }
}

animate()
 let lastKey = ''
//listens to the keyboard
window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
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


