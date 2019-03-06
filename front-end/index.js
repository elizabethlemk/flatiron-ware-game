
function loadCSS(url) {
  const css = document.querySelector('link')
  css.href = url
}

function killScript(id) {
  const script = document.querySelector(id)
  script.parentNode.removeChild(script);
}


let marker = 0
let score = 0


function startGame() {
  loadCSS('memory-game/style.css')
  runMemoryGame()
  // score += returnMemoryScore()
  marker ++
  console.log(`marker is ${marker}. score is ${score}`);
  setTimeout(()=>{
      debugger
    killScript("#memory")}, 5000)

  setTimeout(() => {
    loadCSS('whack-a-mole/style.css')
    runMoleGame()
    // score += returnScore()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },5000)

  setTimeout(() => {
    killScript("#mole")
    loadCSS('pong/style.css')
    runPongGame()
    // score += returnScore()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },10000)

  setTimeout(() => {
    killScript("#pong")
    loadCSS('pong/style.css')
    runPlatformGame()
    // score += returnScore()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },15000)

  setTimeout(() => {
    killScript('#platform')
    marker++
    console.log(`marker is ${marker}. score is ${score}`);
  },20000)
}



function resetGame() {
  marker = 0
  score = 0
  document.querySelector('head').innerHTML += `
  <script id="memory" src="memory-game/src/index.js" type="text/javascript"></script>
  <script id="pong" src="pong/src/index.js" type="text/javascript"></script>
  <script id="mole" src="whack-a-mole/src/index.js" type="text/javascript"></script>
  <script id="platform" src="platform-game/js/main.js" type="text/javascript"></script>`
}
