
function runAsteroidsGame() {
  document.querySelector('#game-area').innerHTML=`
  <div style="display: flex; justify-content: center;">
  <canvas id="astroCanvas" width="700" height="500"></canvas> </div>
   `


  const FPS = 30;   //frames per second
  const LASER_MAX = 10 // max amount of lasers on screen at once
  const LASER_SPEED = 500 // speed of lasers pixels per second
  const LASER_DISTANCE = 0.6;
  const LASER_EXPLOSION_DURATION = 0.1;
  const ROIDS_NUMBER = 5;
  const ROIDS_SIZE = 100;
  const ROIDS_JAG = 0.4
  const ROIDS_SPEED = 100;
  const ROIDS_PTS_LRG = 20;
  const ROIDS_PTS_MED = 50;
  const ROIDS_PTS_SMALL = 100;
  const ROIDS_VERT = 10;
  const FRICTION = 0.7;
  const SHIP_BLINKY = 0.1;
  const SHIP_SIZE = 30 // ship height in pixels
  const SHIP_EXPLOSION_DURATION = 0.3;
  const SHIP_INVISBILITY = 3;
  const SHIP_THRUST = 5; // acceleration of ship in pixels per second
  const TURN_SPEED = 360;
  const SHOW_BOUNDING = false;
  const TEXT_FADE_TIME = 2.7;
  const TEXT_SIZE = 40;

  const canvas = document.querySelector('#astroCanvas');
  const ctx = canvas.getContext("2d");

  let ship = newShip();
  let level, score, roids, text, textAlpha;
  newGame();

  createAsteroid();
  // setup addEventListners
  document.addEventListener('keydown', handlerKeydown)
  document.addEventListener('keyup', handlerKeyup)

  function createAsteroid(){
    roids = [];
    let x, y;
    for (let i = 0; i < (ROIDS_NUMBER + level); i++) {
      do {
      x = Math.floor(Math.random() * canvas.width);
      y = Math.floor(Math.random() * canvas.height);
    } while (distBtwnPoints(ship.x, ship.y, x, y) < ROIDS_SIZE * 2 + ship.r)
      roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 2)));
    }
  };

  function destroyAster(index) {
    const x = roids[index].x;
    const y = roids[index].y;
    const r = roids[index].r;

    if (r === Math.ceil(ROIDS_SIZE / 2)) {
      roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 4 )))
      roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 4 )))
      score += ROIDS_PTS_LRG;
      document.querySelector('.score').innerText = score
    } else if (r === Math.ceil(ROIDS_SIZE / 4 )) {
      roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 8 )))
      roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 8 )))
      score += ROIDS_PTS_MED;
      document.querySelector('.score').innerText = score
    } else {
      score += ROIDS_PTS_SMALL;
      document.querySelector('.score').innerText = score
    }

    // destroy

    roids.splice(index, 1)

    // new level

    if (roids.length === 0) {
      level++;
      newLevel();
    }
  }

  function distBtwnPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function explodeShip() {
    ship.explodeTime = Math.ceil(SHIP_EXPLOSION_DURATION * FPS);
    // ctx.fillStyle = 'lime'
    // ctx.strokeStyle = 'lime'
    // ctx.beginPath();
    // ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
    // ctx.fill();
    // ctx.stroke();
  }

  // set up Game Loop
  setInterval(update, 1000 / FPS);


  // creating roids
  function handlerKeydown(event) {
    switch(event.keyCode) {
      case 32: // keycode for spacebar
      shootLaser();
      break;
      case 37: // keycode arrow left
      ship.rot = TURN_SPEED / 180 * Math.PI / FPS
      break;
      case 38: // keycode arrow up
      ship.thrusting = true;
      break;
      case 39: // keycode arrow right
      ship.rot = - TURN_SPEED / 180 * Math.PI / FPS
      break;
   }
  }

  function handlerKeyup(event) {
    switch(event.keyCode) {
      case 32: // keycode for spacebar
      ship.canShoot = true;
      shootLaser();
      break;
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

  function newAsteroid(x, y, r){
    levelMult = 1 + 0.1 * level;

    const roid = {
      x: x,
      y: y,
      xv: Math.random() * ROIDS_SPEED * levelMult / FPS * (Math.random() < 0.5 ? 1 : - 1 ),
      yv: Math.random() * ROIDS_SPEED * levelMult / FPS * (Math.random() < 0.5 ? 1 : - 1 ),
      r: r,
      a: Math.random() * Math.PI / 2, // radians
      vertices: Math.floor(Math.random() * (ROIDS_VERT + 1) + ROIDS_VERT / 2),
      offset: []
    }
  // create vertex offset array
    for(let i = 0; i < roid.vertices; i++) {
      roid.offset.push(Math.random() * ROIDS_JAG * 2 + 1 - ROIDS_JAG);
    }
    return roid;
  }


  function newGame() {
    level = 0
    score = parseInt(document.querySelector('.score').innerText)
    ship = newShip();
    newLevel();
  }

  function newLevel() {
    text = 'Destroy the asteroids!'
    textAlpha = 1.0;
    createAsteroid();
  }



  function newShip() {
    return {
      // center ship
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: SHIP_SIZE / 2,
      a: 90 / 180 * Math.PI, //convert to radians
      blinkNum: Math.ceil(SHIP_INVISBILITY / SHIP_BLINKY),
      blinkTime: Math.ceil(SHIP_BLINKY * FPS),
      canShoot: true,
      explodetime: 0,
      lasers: [],
      rot: 0,
      thrusting: false,
      thrust: {
        x: 0,
        y: 0,

      }
    }
  };

  function shootLaser() {
    // create laser object
    if (ship.canShoot && ship.lasers.length < LASER_MAX) {
      ship.lasers.push({
        x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        y: ship.y - 4/ 3 * ship.r * Math.sin(ship.a),
        xv: LASER_SPEED * Math.cos(ship.a) / FPS,
        yv: -LASER_SPEED * Math.sin(ship.a) / FPS,
        dist: 0,
        explodeTime: 0

      })
      ship.canShoot = false;
    }
  };



  function update() {
    let blinkOn = ship.blinkNum % 2 === 0;
    let exploding = ship.explodeTime > 0;
    // draw space
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // thrust ship
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
        // draw thurster

        if(!exploding && blinkOn) {

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
      }

    } else {

      ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
      ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }
    // draw ship
    if(!exploding) {
      if(blinkOn) {
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
    }
    if(ship.blinkNum > 0 ) {

      // reduce blink time
      ship.blinkTime--;
      // reduce blink number
      if (ship.blinkTime === 0 ){
          ship.blinkTime = Math.ceil(SHIP_BLINKY * FPS);
          ship.blinkNum--;
      }

    }
  } else {
    ctx.fillStyle = 'darkred'
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'red'
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'orange'
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'yellow'
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'white'
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
    ctx.fill();
  }


    if (SHOW_BOUNDING) {
      ctx.strokeStyle = 'lime'
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
      ctx.stroke();
    }


    // drawing lasers

    for(let i = 0; i < ship.lasers.length; i ++){
      if (ship.lasers[i].explodeTime === 0) {
        ctx.fillStyle = 'salmon';
        ctx.beginPath()
        ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
        ctx.fill();
      } else {
        ctx.fillStyle = 'orangered';
        ctx.beginPath()
        ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = 'darkred';
        ctx.beginPath()
        ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.5, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = 'pink';
        ctx.beginPath()
        ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, Math.PI * 2, false);
        ctx.fill();
      }
    }

  // draw game text

  if(textAlpha >= 0 ) {
    ctx.textAlign = "center"
    text.textBaseline = 'middle'
    ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha})`;
    ctx.font = "small-caps " + TEXT_SIZE + "px dejavu sans mono";
    ctx.fillText(text, canvas.width / 2, canvas.height * 0.75);
    textAlpha -= 1.0 / TEXT_FADE_TIME / FPS;
  }
    // draw text score
    // ctx.textAlign = 'right';
    //   ctx.textBaseline = 'middle';
    //   ctx.fillStyle = "yellow"
    //   ctx.font =  TEXT_SIZE + "px dejavu sans mono";
    //   ctx.fillText(score, canvas.width - SHIP_SIZE / 2, SHIP_SIZE);

    // detect
    let ax, ay, ar, lx, ly;
    for (let i = roids.length - 1; i >= 0; i--) {
      // grab asteroids props
      ax = roids[i].x;
      ay = roids[i].y;
      ar = roids[i].r;


      // loop over lasers
      for(var j = ship.lasers.length - 1; j >= 0; j--){
        lx = ship.lasers[j].x;
        ly = ship.lasers[j].y;

        // detect hits
        if( ship.lasers[j].explodeTime === 0 && distBtwnPoints(ax, ay, lx, ly) < ar ) {
            destroyAster(i);
            ship.lasers[j].explodeTime = Math.ceil(LASER_EXPLOSION_DURATION * FPS)
          // remove asteroids

          break;
        }

      }

    }


    // draw asteroids

    let x, y, r, a, vert, offs;
    ctx.lineWidth = SHIP_SIZE / 20;

    for(let i = 0; i < roids.length; i++){
      ctx.strokeStyle = 'slategrey'
      ctx.fillStyle = '#F5F3CE'

  // asteroids props
      x = roids[i].x;
      y = roids[i].y;
      r = roids[i].r;
      a = roids[i].a;
      vert = roids[i].vertices;
      offs = roids[i].offset

      // draw a path
      ctx.beginPath();
      ctx.moveTo(
        x + r * offs[0] * Math.cos(a),
        y + r * offs[0] * Math.sin(a)
      );

      // poly
      for (var j = 1; j < vert; j++) {

      ctx.lineTo(
        x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
        y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
      )
    };
    ctx.closePath();
    ctx.fill();
    ctx.stroke();



  if (SHOW_BOUNDING) {
    ctx.strokeStyle = 'lime'
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.stroke();
    }

  }
  if(!exploding) {
    if (ship.blinkNum === 0) {
      for(let i = 0; i < roids.length; i++) {
        if(distBtwnPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].r) {
          explodeShip();
          destroyAster(i);
          break;
        }
      }
    }

    // rotate ship

    ship.a += ship.rot;


    // move ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;
  } else {
    ship.explodeTime--;

    if (ship.explodeTime === 0 ) {
      ship = newShip()
    }
  }
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



    // move lasers
    for(let i = ship.lasers.length - 1 ; i >= 0; i--) {
      if (ship.lasers[i].dist > LASER_DISTANCE * canvas.width ) {
        ship.lasers.splice(i, 1);
        continue;
      }

      if (ship.lasers[i].explodeTime > 0) {
        ship.lasers[i].explodeTime--;
          if (ship.lasers[i].explodeTime === 0) {
            ship.lasers.splice(i, 1)
            continue;
          }
      } else {
        ship.lasers[i].x += ship.lasers[i].xv;
        ship.lasers[i].y += ship.lasers[i].yv;

        // calculate the distance
        ship.lasers[i].dist +=  Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));
    }
    // edge of screen
    if (ship.lasers[i].x < 0) {
        ship.lasers[i].x = canvas.width;
    } else if (ship.lasers[i].x > canvas.width) {
      ship.lasers[i].x = 0;
    }
    if (ship.lasers[i].y < 0) {
        ship.lasers[i].y = canvas.height;
    } else if (ship.lasers[i].y > canvas.height) {
      ship.lasers[i].y = 0;
    }

  }

  for(let i = 0; i < roids.length; i++) {

    // move asteroids
    roids[i].x += roids[i].xv;
    roids[i].y += roids[i].yv;


    // edge of screen
    // debugger
    if (roids[i].x < 0 - roids[i].r){
      roids[i].x = canvas.width + roids[i].r;
      } else if (roids[i].x > canvas.width + roids[i].r) {
                roids[i].x = 0 - roids[i].r
      }
      if (roids[i].y < 0 - roids[i].r){
      roids[i].y = canvas.height + roids[i].r;
      } else if (roids[i].x > canvas.height + roids[i].r) {
      roids[i].y = 0 - roids[i].r
      }
    }
  }
}
