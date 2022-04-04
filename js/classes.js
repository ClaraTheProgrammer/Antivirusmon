class Sprite{
    constructor({position, velocity, image, frames = {max:1}, sprites}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () =>{
            this.width = this.image.width/ this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }
    draw(){
        c.drawImage(
            this.image,
            this.frames.val * this.width, //crop starting x pos
            0, //crop starting  y pos
            this.image.width/this.frames.max, //crop ending x pos
            this.image.height,  //crop ending y pos
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max, //width of the cropped pic
            this.image.height   //height of the cropped pic
        )//loads the character second
        if(!this.moving) return
        if(this,this.frames.max>1){
            this.frames.elapsed++
        }
        if(this.frames.elapsed % 5 === 0){
            if(this.frames.val < this.frames.max-1)this.frames.val++
            else this.frames.val = 0
        }

    }

}

class Boundary{
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
         c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}