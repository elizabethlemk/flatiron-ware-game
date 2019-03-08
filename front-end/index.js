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
let allUsers = []
let menuSong = new sound('menu.mp3')
let mySound = new sound('main-title.mp3')
let endSound = new sound('end-song.mp3')
renderAllUsers()
renderAllScores()
//

// document.addEventListener('DOMContentLoaded', ()=> menuSong.play())


//------------------------------------------//
// Starts the Game
//------------------------------------------//
function startGame() {
  menuSong.stop()
  mySound.play()
  document.querySelector('.title').remove()
  document.querySelector('.scoreBoard').innerHTML = `<h2>Score: <span class="score">0</span></h2>`
  loadCSS('css-styles/loading.css')
  getReady()

  // Runs Memory Game
  setTimeout(()=>{
    loadCSS('memory-game/style.css')
    runMemoryGame()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  }, 3000)

// Kills Memory Game
  setTimeout(()=>{
    score += parseInt(document.querySelector('.score').innerText)
    killScript("#memory")
    loadCSS('css-styles/loading.css')
    getReady()}, 13000)

// Run Platform Game -- Transition
  setTimeout(() => {
    runPlatform2Game()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },16000)

// Kills Platform Game -- Transition
  setTimeout(()=> {
    score += parseInt(document.querySelector('.score').innerText)
    document.querySelector('canvas').remove()
    killScript("#platform2")
    loadCSS('css-styles/loading.css')
    getReady()
  }, 26000)

// Run Whack-A-Mole
  setTimeout(() => {
    loadCSS('whack-a-mole/style.css')
    runMoleGame()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },29000)

// Kills Whack-A-Mole -- Transition
  setTimeout(()=> {
    score += parseInt(document.querySelector('.score').innerText)
    killScript("#mole")
    loadCSS('css-styles/loading.css')
    getReady()
  }, 39000)

// Run Pong
  setTimeout(() => {
    loadCSS('pong/style.css')
    runPongGame()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },42000)

// Kill Pong -- Transition
  setTimeout(()=> {
    score += parseInt(document.querySelector('.score').innerText)
    killScript("#pong")
    loadCSS('css-styles/loading.css')
    getReady()
  }, 52000)

// Run Asteroids
  setTimeout(() => {
    runAsteroidsGame()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
  },55000)

// Kill Asteroids -- Input Name && Final Score
  setTimeout(()=> {
    score += parseInt(document.querySelector('.score').innerText)
    killScript("#asteroids")
    loadCSS('css-styles/end.css')
    jelly()
    endGame()
  }, 65000)
}
//------------------------------------------//
// End Game
//------------------------------------------//

function endGame() {
  mySound.stop()
  endSound.play()
  document.querySelector('.scoreBoard').remove()
  document.querySelector('#game-area').innerHTML += `
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
// Create User
//------------------------------------------//
function createUser(userName) {
  fetch('http://localhost:3000/users',{
    method: 'POST',
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({name: userName})
  }).then(resp => resp.json() ).then(json => {
    const gameArea = document.querySelector('#game-area')
    gameArea.innerHTML += `<h1 class="user-score" style="color: white; font-family: sans-serif; letter-spacing: 5px; text-transform: uppercase;">
      ${json.name}:  ${score}
    </h1>`
    document.querySelector('#userName').remove()

    // Creates a refresh button
    setTimeout(() => {
      gameArea.innerHTML += `
        <button id="reset" class="bounce-top" onclick="window.location.reload();">Play again?</button>
      `
    }, 3000)
    postScore(json.id, score)
  })
}

//------------------------------------------//
// Posts the Score
//------------------------------------------//

function postScore(user, score) {
  fetch('http://localhost:3000/games',{
    method: 'POST',
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify (
      {user_id: user,
      scores: score}
    )
  }).then(resp => resp.json()).then(json => {
    renderAllUsers()
    document.querySelector('#top-players').innerHTML = ""
    renderAllScores()
  })
}

//------------------------------------------//
// Renders the Users
//------------------------------------------//

function renderAllUsers() {
  fetch('http://localhost:3000/users')
  .then(resp => resp.json())
  .then(json => {
    allUsers.push(json)
  })
}

//------------------------------------------//
// Renders All Scores
//------------------------------------------//

function renderAllScores() {
    let sortedArr = []
    const allScores = document.querySelector('#top-players')
    fetch('http://localhost:3000/games')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(obj => {
        const userName = allUsers[0].find(users => users.id == obj.id).name
        sortedArr.push({name: userName, score: obj.scores})
      })
      sortedArr.sort((a, b) => b.score - a.score).slice(0, 10).forEach((user, index) =>
      {  allScores.innerHTML += `
        <li>${index + 1}. ${user.name}: ${user.score}</li>
        `}
      )
    })
}

//------------------------------------------//
// Music
//------------------------------------------//
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//------------------------------------------//
// Get Ready Screen
//------------------------------------------//
function getReady() {
  document.querySelector('#game-area').innerHTML= `
  <svg id="ready" viewBox="0 0 600 300">
    <symbol id="s-text">
      <text text-anchor="middle"
              x="50%" y="50%" dy=".30em">
         Get Ready
       </text>
    </symbol>
    <use xlink:href="#s-text" class="text"></use>
    <use xlink:href="#s-text" class="text"></use>
    <use xlink:href="#s-text" class="text"></use>
    <use xlink:href="#s-text" class="text"></use>
    <use xlink:href="#s-text" class="text"></use>
  </svg>`
}

//------------------------------------------//
// Jelly Screen
//------------------------------------------//
function jelly() {
  document.querySelector('#game-area').innerHTML= `
  <div class="jelly-container">
  <div class="bubble-1"></div>
  <div class="bubble-2"></div>
  <div class="bubble-3"></div>
  <div class="bubble-4"></div>
  <div class="bubble-5"></div>
  <div class="bubble-6"></div>
  <div class="bubble-7"></div>
  <div class="bubble-8"></div>
  <div class="bubble-9"></div>
  <div class="bubble-10"></div>
  <div class="jelly-wrapper">
  <div class="jelly-hair"></div>
  <div class="jelly-body">
  <div class="jelly-inner">
  <div class="jelly-eyes"></div>
  <div class="jelly-mouth"></div>
  <div class="jelly-hands"></div>
  </div>
  </div>
  <div class="jelly-tentacle-1"></div>
  <div class="jelly-tentacle-2"></div>
  <div class="jelly-tentacle-3"></div>
  <div class="jelly-tentacle-4"></div>
  <div class="jelly-tentacle-5"></div>
  </div>
  <div class="jelly-shadow"></div>
  <div class="bubble-11"></div>
  <div class="bubble-12"></div>
  <div class="bubble-13"></div>
  <div class="bubble-14"></div>
  <div class="bubble-15"></div>
  <div class="bubble-16"></div>
  <div class="bubble-17"></div>
  <div class="bubble-18"></div>
  <div class="bubble-19"></div>
  <div class="bubble-20"></div>
  </div>`
}
