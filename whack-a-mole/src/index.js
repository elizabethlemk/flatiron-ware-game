document.addEventListener('DOMContentLoaded', () => {

  //------------------------//
  // important variables
  //------------------------//
  const holes = document.querySelectorAll('.hole')
  const scoreBoard = document.querySelector('.score')
  const moles = document.querySelectorAll('.mole')
  let lastHole
  let timeUp = false
  let score = 0

  //------------------------//
  // event listeners
  //------------------------//
  moles.forEach(mole => mole.addEventListener('click', bonk))
  document.querySelector('#start_game').addEventListener('click', startGame)

  //------------------------//
  // helper functions
  //------------------------//

  // generates a random time when moles to pop up
  function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }

  // generates a random hole for mole to pop up from
  function randHole(holes) {
    const index = Math.floor(Math.random() * holes.length)
    const hole = holes[index]
    if (hole === lastHole) { //prevents the same hole from popping up in a row
      return randHole(holes)
    }
    lastHole = hole
    return hole
  }

  // makes the moles pop up from the hole
  function peep() {
    const time = randTime(200, 1000) //in millisecs
    const hole = randHole(holes)
    hole.classList.add('up')
    setTimeout( () => {
      hole.classList.remove('up')
      if (!timeUp) {
        peep()
      }
    }, time)
  }

  //------------------------//
  // handles event functions
  //------------------------//
  function startGame() {
    scoreBoard.innerText = 0
    score = 0
    timeUp = false
    peep()
    setTimeout( () => timeUp = true, 10000) //the game lasts 10secs
  }

  function bonk(event) {
    if (!event.isTrusted) return; //this prevents cheating
      score ++
      this.classList.remove('up')
      scoreBoard.innerText = score
      this.removeEventListener('click', bonk)
      setTimeout( () => {
        this.addEventListener('click', bonk)
      }, 300)
  }
})
