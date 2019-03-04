const FPS = 30 //Frames per sec




const FPS = 30;   //frames per second
const SHIP_SIZE = 30 // ship height in pixels


const canvas = document.querySelector('#astroCanvas');
const ctx = canvas.getContext("2d");

// set up Game Loop
setInterval(update, 1000 / FPS);

function update() {
  // draw space
  ctx.fillStyle = 'black'

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw ship

  const ship = {
    // center ship
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 / Math.PI
  }

  // move ship
}
