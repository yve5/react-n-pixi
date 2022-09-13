import React, { useRef, useEffect } from 'react';
import { Application, Graphics } from 'pixi.js';

const Circle = (color, radius, velocity, app) => {
  const circle = new Graphics();

  circle.beginFill(color);
  circle.drawCircle(0, 0, radius);
  circle.endFill();
  circle.x = radius;
  circle.y = radius;

  app.stage.addChild(circle);

  return {
    radius,
    velocity,
    circle,
    remove: () => {
      app.stage.removeChild(circle);
    },
    collide: (other) => {
      const dx = other.circle.x - circle.x;
      const dy = other.circle.y - circle.y;

      return Math.sqrt(dx * dx + dy * dy) < radius + other.radius;
    },
  };
};

const Monster = (color, radius, velocity, app, canvasWidth, canvasHeight) => {
  let innerPlayer = Circle(color, radius, velocity, app);

  return {
    ...innerPlayer,
    update: () => {
      innerPlayer.circle.x += innerPlayer.velocity.x;
      innerPlayer.circle.y += innerPlayer.velocity.y;

      if (innerPlayer.circle.x >= canvasWidth - innerPlayer.radius) {
        //   shake('right');
        innerPlayer.velocity.x *= -1;
      } else if (innerPlayer.circle.x <= innerPlayer.radius) {
        //   shake('left');
        innerPlayer.velocity.x *= -1;
      }

      if (innerPlayer.circle.y >= canvasHeight - innerPlayer.radius) {
        //   shake('down');
        innerPlayer.velocity.y *= -1;
      } else if (innerPlayer.circle.y <= innerPlayer.radius) {
        //   shake('up');
        innerPlayer.velocity.y *= -1;
      }
    },
  };
};

const Player = (color, radius, velocity, app, canvasWidth, canvasHeight) => {
  let innerPlayer = Circle(color, radius, velocity, app);

  innerPlayer = {
    ...innerPlayer,
    reset: () => {
      innerPlayer.circle.x = canvasWidth / 2;
      innerPlayer.circle.y = canvasHeight / 2;
      innerPlayer.speed = 2;
    },
    update: (monsters, coin) => {
      let x = innerPlayer.circle.x + innerPlayer.velocity.x;
      let y = innerPlayer.circle.y + innerPlayer.velocity.y;

      innerPlayer.circle.x = Math.min(
        Math.max(x, innerPlayer.radius),
        canvasWidth - innerPlayer.radius
      );
      innerPlayer.circle.y = Math.min(
        Math.max(y, innerPlayer.radius),
        canvasWidth - innerPlayer.radius
      );

      monsters.forEach((monster) => {
        if (innerPlayer.collide(monster)) {
          innerPlayer.reset();
        }
      });

      // coin
      if (innerPlayer.collide(coin)) {
        // updateCoins(coins + 1);
        coin.random();

        monsters.push(
          Monster(
            0x79a3b1,
            Math.random() * 10 + 10,
            {
              x: 2 + Math.random(),
              y: 2 + Math.random(),
            },
            app,
            canvasWidth,
            canvasHeight
          )
        );

        innerPlayer.speed = Math.min(4, innerPlayer.speed + 0.2);
        // ClickEvent('coins');
      }
    },
  };

  innerPlayer.reset();

  return innerPlayer;
};

const Coin = (color, radius, velocity, app, canvasWidth, canvasHeight) => {
  let innerPlayer = Circle(color, radius, velocity, app);

  return {
    ...innerPlayer,
    random: () => {
      innerPlayer.circle.x =
        innerPlayer.radius +
        Math.random() * (canvasWidth - 2 * innerPlayer.radius);
      innerPlayer.circle.y =
        innerPlayer.radius +
        Math.random() * (canvasHeight - 2 * innerPlayer.radius);
    },
    update: () => {
      const size = 1 + Math.sin(new Date() * 0.01) * 0.2;
      innerPlayer.circle.scale.set(size, size);
    },
  };
};

const App = () => {
  const innerRef = useRef(null);
  const requestRef = useRef(null);

  const canvasWidth = 512;
  const canvasHeight = 512;

  const app = new Application({
    backgroundColor: 0x456268,
    height: canvasHeight,
    width: canvasWidth,
  });

  let monsters = [];
  let pressed = {};

  const player = Player(
    0xfcf8ec,
    10,
    { x: 0, y: 0 },
    app,
    canvasWidth,
    canvasHeight
  );

  const coin = Coin(
    0xfcf8ec,
    10,
    { x: 0, y: 0 },
    app,
    canvasWidth,
    canvasHeight
  );
  coin.random();
  // let coins;

  const onkeydown = (ev) => {
    switch (ev.key) {
      case 'ArrowLeft':
      case 'a':
        player.velocity.x = -player.speed;
        pressed.left = true;
        break;

      case 'ArrowRight':
      case 'd':
        player.velocity.x = player.speed;
        pressed.right = true;
        break;

      case 'ArrowUp':
      case 'w':
        player.velocity.y = -player.speed;
        pressed.up = true;
        break;

      case 'ArrowDown':
      case 's':
      default:
        player.velocity.y = player.speed;
        pressed.down = true;
        break;
    }
  };

  const onkeyup = (ev) => {
    switch (ev.key) {
      case 'ArrowLeft':
      case 'a':
        player.velocity.x = pressed.right ? player.speed : 0;
        pressed.left = false;
        break;

      case 'ArrowRight':
      case 'd':
        player.velocity.x = pressed.left ? -player.speed : 0;
        pressed.right = false;
        break;

      case 'ArrowUp':
      case 'w':
        player.velocity.y = pressed.down ? player.speed : 0;
        pressed.up = false;
        break;

      case 'ArrowDown':
      case 's':
      default:
        player.velocity.y = pressed.up ? -player.speed : 0;
        pressed.down = false;
        break;
    }
  };

  const gameLoop = () => {
    player.update(monsters, coin);
    coin.update();

    monsters.forEach((monster) => {
      monster.update();
    });

    requestRef.current = window.requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    innerRef.current.appendChild(app.view);
    app.start();

    requestRef.current = window.requestAnimationFrame(gameLoop);

    document.addEventListener('keydown', onkeydown);
    document.addEventListener('keyup', onkeyup);

    return () => {
      app.stop();

      cancelAnimationFrame(requestRef.current);

      document.removeEventListener('keydown', onkeydown);
      document.removeEventListener('keyup', onkeyup);
    };
  });

  return <div className="App" ref={innerRef} />;
};

export default App;
