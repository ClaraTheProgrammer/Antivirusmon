const monsters = {
    anti_mon: {
      position: {
        x: 220,
        y: 200
      },
      image: {
        src: './images/battle/Antimon.png'
      },
      frames: {
        max: 8,
        hold: 10
      },
      animate: true,
      name: 'Anti-Virusmon',
      attacks: [attacks.Tackle, attacks.CodeCrunch],
      maxhealth: 300,
      strength: 1
    },

    enemies:
    [
      //virusmon1
        {
        position: {
          x: 750,
          y: 50
        },
        image: {
          src: './images/battle/Virusmon.png'
        },
        frames: {
          max: 16,
          hold: 10
        },
        animate: true,
        isEnemy: true,
        name: 'Virusmon1',
        attacks: [attacks.Tackle],
        maxhealth: 100,
        strength: 1
      },

      //virusmon2
      {
        position: {
          x: 750,
          y: 50
        },
        image: {
          src: './images/battle/Virusmon2.png'
        },
        frames: {
          max: 16,
          hold: 10
        },
        animate: true,
        isEnemy: true,
        name: 'Virusmon2',
        attacks: [attacks.Tackle],
        maxhealth: 150,
        strength: 1
      },

      //virusmon3
       {
        position: {
          x: 750,
          y: 50
        },
        image: {
          src: './images/battle/Virusmon3.png'
        },
        frames: {
          max: 16,
          hold: 10
        },
        animate: true,
        isEnemy: true,
        name: 'Virusmon3',
        attacks: [attacks.Tackle],
        maxhealth: 50,
        strength: 5
      }
    ]
  }