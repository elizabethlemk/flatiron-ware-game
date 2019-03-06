
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

    loadCSS('memory-game/style.css')
    runMemoryGame()
    // score += returnMemoryScore()
    marker ++
    console.log(`marker is ${marker}. score is ${score}`);
    setTimeout(()=>{killScript("#memory")}, 5000)

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





// let marker = 0
//
//   switch (marker) {
//     case 0:
//       loadCSS('memory-game/style.css')
//       runMemoryGame()
//       setTimeout(()=>{killScript("#memory")}, 5000)
//       marker ++
//       console.log(`marker is ${marker}`);
//       break;
//     case 1:
//       setTimeout(() => {
//         loadCSS('whack-a-mole/style.css')
//         runMoleGame()
//         marker ++
//         console.log(`marker is ${marker}`);
//       },5000)
//       break;
//     case 2:
//       setTimeout(() => {
//         killScript("#mole")
//         loadCSS('pong/style.css')
//         runPongGame()
//         marker ++
//         console.log(`marker is ${marker}`);
//       },5000)
//       break;
//     case 3:
//       setTimeout(() => {
//         killScript("#pong")
//         loadCSS('pong/style.css')
//         runPlatformGame()
//         marker ++
//         console.log(`marker is ${marker}`);
//       },5000)
//       break;
//   }
