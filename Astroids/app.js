
const FPS = 30;   //frames per second
const SHIP_SIZE = 30 // ship height in pixels


const canvas = document.querySelector('#astroCanvas');
const ctx = canvas.getContext("2d");

const ship = {
  // center ship
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: SHIP_SIZE / 2,
  a: 90 / 180 * Math.PI //convert to radians
}


// set up Game Loop
setInterval(update, 1000 / FPS);

function update() {
  // draw space
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw ship
  ctx.strokeStyle = 'white';
  ctx.lineWidth = SHIP_SIZE / 20
  ctx.beginPath();
  ctx.moveTo( //nose of the ship
    ship.x + ship.r * Math.cos(ship.a),
    ship.y - ship.r * Math.sin(ship.a)
  );
  ctx.lineTo( //rear left
    ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
    ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
  );
  ctx.lineTo( //rear right
    ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)),
    ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
  );
  ctx.closePath();
  ctx.stroke();


  // move ship
}
