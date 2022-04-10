//Background
const battle_background_img = new Image()
battle_background_img.src = './images/battle/battle_background.png'
const battle_background = new Sprite({position:{x:0, y:0}, image: battle_background_img})

//Characters
//Enememy: virusmon
let anti_mon = new Monster(monsters.anti_mon)
let virusmon
let renderedSprites
let battleAnimationId
let queue

let pause = false

let pause_input = false;

function getMonsterBasedOnFile(file){

}

function startBattle() {
  //randomly get a new monster to fight.  Change later to implement hash
  //random monster = Math.floor(Math.random()*(monsters.enemies.length))

  virusmon = new Monster(monsters.enemies[Math.floor(Math.random()*(monsters.enemies.length))])
  virusmon.health = virusmon.maxHealth

  renderedSprites = [anti_mon, virusmon]
  queue = []

  if(anti_mon.health <= 0)
    anti_mon.health = anti_mon.maxHealth

  virusmon.position =         
  {
    x: 740,
    y: 70
  },

  document.querySelector('#enemyHealthBar').style.width = (virusmon.health/virusmon.maxHealth*100) + '%'
  document.querySelector('#playerHealthBar').style.width = (anti_mon.health/anti_mon.maxhealth*100) + '%'

  gsap.to(document.querySelector('#enemyHealthBar'), {width: (virusmon.health)/virusmon.maxHealth*100 + '%'})
  gsap.to(document.querySelector('#playerHealthBar'), {width: (anti_mon.health/anti_mon.maxhealth)*100 + '%'})


  gsap.to('#battle_transition', {opacity: 1, repeat:2, 
    onComplete(){ gsap.to('#battle_transition', {opacity: 1})},
    onComplete(){ 
      animateBattle(), 
      gsap.to('#battle_transition', {opacity: 0})
      document.querySelector('#BattleOverlay').style.display = 'block'
      document.querySelector('#DialogueBox').style.display = 'none'

      document.querySelector('#attacksBox').replaceChildren()
      initBattle()
    }})
  
}

function initBattle() {  

    document.querySelector('#DialogueBox').style.display = 'block'
    document.querySelector('#DialogueBox').innerHTML = virusmon.entry_messages[Math.floor(Math.random()*(virusmon.entry_messages.length))]

    anti_mon.attacks.forEach((attack) => {
      const button = document.createElement('button')
      button.innerHTML = attack.name
      button.classList.add('attack_bttn')
      document.querySelector('#attacksBox').append(button)
    })

    gsap.to(
          anti_mon.position, {x: anti_mon.position.x, y: anti_mon.position.y},
          gsap.to(virusmon.position, {x: virusmon.position.x, y: virusmon.position.y}),
          gsap.to(anti_mon, {opacity: 1}),
          gsap.to(virusmon, {opacity: 1})
    )
  

    // our event listeners for our buttons (attack)
    Array.from(document.getElementsByClassName('attack_bttn')).forEach((button) => {
      button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        anti_mon.attack({
          attack: selectedAttack,
          recipient: virusmon,
          renderedSprites
        })
  
        if (virusmon.health <= 0) {
          queue.push(() => {
            virusmon.faint()
          })
          queue.push(() => {
            // fade back to black
            gsap.to('#battle_transition', {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId)
                animate()
                document.querySelector('#BattleOverlay').style.display = 'none'
  
                gsap.to('#battle_transition', {
                  opacity: 0
                })
  
                battle.initiated = false
              }
            })
          })
        }
  
        //enemy's attack
        const randomAttack =
        virusmon.attacks[Math.floor(Math.random() * virusmon.attacks.length)]
  
        queue.push(() => {
            virusmon.attack({
            attack: randomAttack,
            recipient: anti_mon,
            renderedSprites
          })
  
          if (anti_mon.health <= 0) 
          {
            queue.push(() => {
            anti_mon.faint()})
  
            queue.push(() => {
              // fade back to black
              gsap.to('#battle_transition', {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(battleAnimationId)
                  animate()
                  document.querySelector('#BattleOverlay').style.display = 'none'
  
                  gsap.to('#battle_transition', {
                    opacity: 0
                  })
                  battle.initiated = false
                }
              })
            })
          }
        })
      })
  
        //adds the attack information on the bottom of the user UI
        button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        //document.querySelector('#attackType').innerHTML = selectedAttack.type
        //document.querySelector('#attackType').style.color = selectedAttack.color
      })
    })
  }

function animateBattle(){
    battleAnimationId  = window.requestAnimationFrame(animateBattle)

    battle_background.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    });
}

document.querySelector('#DialogueBox').addEventListener('click', (e) =>{
  if(pause_input)  
    return 
  
  e.currentTarget.style.display = 'none';
    console.log(pause_input)
    if(queue.length > 0)
    {
        console.log(queue)
        queue[0]()
        queue.shift()
    }
    else
    {
        e.currentTarget.style.display = 'none';
    }
})