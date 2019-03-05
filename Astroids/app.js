
const FPS = 30;   //frames per second
const FRICTION = 0.7;
const SHIP_SIZE = 30 // ship height in pixels
const SHIP_THRUST = 5; // acceleration of ship in pixels per second
const TURN_SPEED = 360;

const canvas = document.querySelector('#astroCanvas');
const ctx = canvas.getContext("2d");

const ship = {
  // center ship
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: SHIP_SIZE / 2,
  a: 90 / 180 * Math.PI, //convert to radians
  rot: 0,
  thrusting: false,
  thrust: {
    x: 0,
    y: 0,

  }
}

// setup addEventListners
document.addEventListener('keydown', handlerKeydown)
document.addEventListener('keyup', handlerKeyup)


// set up Game Loop
setInterval(update, 1000 / FPS);

function handlerKeydown(event) {
  switch(event.keyCode) {
    case 37:
    ship.rot = TURN_SPEED / 180 * Math.PI / FPS
    break;
    case 38:
    ship.thrusting = true;
    break;
    case 39:
    ship.rot = - TURN_SPEED / 180 * Math.PI / FPS
    break;
 }
}

function handlerKeyup(event) {
  switch(event.keyCode) {
    case 37:
    ship.rot = 0;
    break;
    case 38:
    ship.thrusting = false;
    break;
    case 39:
    ship.rot = 0;
    break;
 }
}


function update() {
  // draw space
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // thrust ship
  if (ship.thrusting) {
      ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
      ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
      // draw thurster
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = SHIP_SIZE / 10
      ctx.beginPath();
      ctx.moveTo( //rear left
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) -  0.5 * Math.cos(ship.a))
      );
      ctx.lineTo( //behind ship
      ship.x - ship.r * 6 / 3 * Math.cos(ship.a),
      ship.y + ship.r * 6 / 3 * Math.sin(ship.a)
      );
      ctx.lineTo( //rear right
      ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
      ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

  } else {

    ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
    ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
  }
  // draw ship
  ctx.strokeStyle = 'white';
  ctx.lineWidth = SHIP_SIZE / 20
  ctx.beginPath();
  ctx.moveTo( //nose of the ship
    ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
    ship.y - 4/ 3 * ship.r * Math.sin(ship.a)
  );
  ctx.lineTo( //rear left
    ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
    ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
  );
  ctx.lineTo( //rear right
    ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
    ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
  );
  ctx.closePath();
  ctx.stroke();


  // rotate ship

  ship.a += ship.rot;


  // move ship
  ship.x += ship.thrust.x;
  ship.y += ship.thrust.y;

  // prevent ship coming off screen
  if (ship.x < 0 - ship.r ){
    ship.x = canvas.width + ship.r
  } else if (ship.x > canvas.width + ship.r ) {
    ship.x = 0 - ship.r;
  }

  if (ship.y < 0 - ship.r ){
    ship.y = canvas.height + ship.r
  } else if (ship.y > canvas.height + ship.r ) {
    ship.y = 0 - ship.r;
  }


}
