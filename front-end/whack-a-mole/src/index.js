function runMoleGame(){
  console.log("this is whack-a-mole");
  document.querySelector('body').innerHTML = `<h1>Whack-a-mole! </h1>

<h2>Score: <span class="score">0</span></h2>

 <div class="game">
   <div class="hole hole1">
     <div class="mole"></div>
   </div>
   <div class="hole hole2">
     <div class="mole"></div>
   </div>
   <div class="hole hole3">
     <div class="mole"></div>
   </div>
   <div class="hole hole4">
     <div class="mole"></div>
   </div>
   <div class="hole hole5">
     <div class="mole"></div>
   </div>
   <div class="hole hole6">
     <div class="mole"></div>
   </div>
 </div>

<div class="start_button">
  <button id="start_game">Start!</button>
</div>`

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
    const time = randTime(300, 1000) //in millisecs
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
      setTimeout( () => { //prevents double clicking
        this.addEventListener('click', bonk)
      }, 500)
  }

  function returnScore() {
    return score
  }
}
