//------------------------------------------//
// Loads Game CSS File
//------------------------------------------//
function loadCSS(url) {
  const css = document.querySelector('#game-style')
  css.href = url
}
//------------------------------------------//
// Kills Game JS File
//------------------------------------------//
function killScript(id) {
  const script = document.querySelector(id)
  script.parentNode.removeChild(script);
}
//------------------------------------------//
// Tracks Score
//------------------------------------------//
let marker = 0
let score = 0

//------------------------------------------//
// Create User
//------------------------------------------//



//------------------------------------------//
// Starts the Game
//------------------------------------------//
function startGame() {
  document.querySelector('.title').remove()
  loadCSS('memory-game/style.css')
  runMemoryGame()
  // score += returnMemoryScore()
  marker ++
  console.log(`marker is ${marker}. score is ${score}`);
  setTimeout(()=>{
      debugger
    killScript("#memory")}, 5000)

  setTimeout(() => {
    runPlatform2Game()
    // score += returnScore()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },5000)

  setTimeout(() => {
    document.querySelector('canvas').remove()
    killScript("#platform2")
    loadCSS('whack-a-mole/style.css')
    runMoleGame()
    // score += returnScore()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },10000)

  setTimeout(() => {
    killScript("#mole")
    loadCSS('pong/style.css')
    runPongGame()
    // score += returnScore()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },15000)

  setTimeout(() => {
    killScript("#pong")
    loadCSS('pong/style.css')
    killScript('#platform')
    // runPlatformGame()
    // score += returnScore()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },20000)

  // setTimeout(() => {

  //   marker++
  //   console.log(`marker is ${marker}. score is ${score}`);
  // },25000)
}


//------------------------------------------//
// Resets the Game
//------------------------------------------//
function resetGame() {
  marker = 0
  score = 0
  document.querySelector('head').innerHTML += `
  <script id="memory" src="memory-game/src/index.js" type="text/javascript"></script>
  <script id="pong" src="pong/src/index.js" type="text/javascript"></script>
  <script id="mole" src="whack-a-mole/src/index.js" type="text/javascript"></script>
  <script id="platform" src="platform-game/js/main.js" type="text/javascript"></script>`
}
