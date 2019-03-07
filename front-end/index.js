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
    score += parseInt(document.querySelector('.score').innerText)
    killScript("#memory")}, 5000)

  setTimeout(() => {
    runPlatform2Game()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },5000)

  setTimeout(() => {
    score += parseInt(document.querySelector('.score').innerText)
    document.querySelector('canvas').remove()
    killScript("#platform2")
    loadCSS('whack-a-mole/style.css')
    runMoleGame()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },10000)

  setTimeout(() => {
    score += parseInt(document.querySelector('.score').innerText)
    killScript("#mole")
    loadCSS('pong/style.css')
    runPongGame()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },15000)

  setTimeout(() => {
    score += parseInt(document.querySelector('.score').innerText)
    killScript("#pong")
    runAsteroidsGame()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },20000)

  setTimeout(() => {
    score += parseInt(document.querySelector('.score').innerText)
    killScript("#asteroids")
    endGame()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },25000)
}
//------------------------------------------//
// End Game
//------------------------------------------//

function endGame() {
  document.querySelector('#game-area').innerHTML = `
  <form id="userName">
    <input class="input-text" type="text" name="name" placeholder="Enter your name">
    <input type="submit" name="submit" value="Submit" class="submit">
  </form>
  `
  document.querySelector('#userName').addEventListener('submit', () => {
    event.preventDefault()
    const userName = event.target.querySelector('.input-text').value
    createUser(userName)
  })
}


//------------------------------------------//
// Resets the Game
//------------------------------------------//
function resetGame() {
  marker = 0
  // score = 0
  document.querySelector('head').innerHTML += `
  <script id="memory" src="memory-game/src/index.js" type="text/javascript"></script>
  <script id="pong" src="pong/src/index.js" type="text/javascript"></script>
  <script id="mole" src="whack-a-mole/src/index.js" type="text/javascript"></script>
  <script id="platform" src="platform-game/js/main.js" type="text/javascript"></script>`
}

//------------------------------------------//
// Create User
//------------------------------------------//
function createUser(userName) {
  fetch('http://localhost:3000/users',{
    method: 'POST',
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify (
      {name: userName}
    )
  }).then(resp => resp.json()).(json => {
    debugger
    ///creates a new score
  })
}

//------------------------------------------//
// Posts the Score
//------------------------------------------//

// function postScore(user, score) {
//   fetch('http://localhost:3000/scores',{
//     method: 'POST',
//     headers: {
//       "content-type": "application/json",
//       "accept": "application/json"
//     },
//     body: JSON.stringify (
//       {user_id: user.id,
//       score: score}
//     )
//   }).then(resp => resp.json()).(json => {
//
//     ///renders the score on the page somewhere
//   })
// }
