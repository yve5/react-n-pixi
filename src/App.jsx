import React, { useRef, useEffect } from 'react';
import {
  Application,
  Container,
  Sprite,
  Text,
  TextStyle,
  Texture,
} from 'pixi.js';

import Bunny from './bunny.png';

const App = () => {
  const innerRef = useRef(null);

  const app = new Application({
    backgroundColor: 0x5bba6f,
    height: 600,
    width: 800,
  });

  const skewStyle = new TextStyle({
    fontFamily: 'Arial',
    dropShadow: true,
    dropShadowAlpha: 0.8,
    dropShadowAngle: 2.1,
    dropShadowBlur: 4,
    dropShadowColor: '0x111111',
    dropShadowDistance: 10,
    fill: ['#ffffff'],
    stroke: '#004620',
    fontSize: 60,
    fontWeight: 'lighter',
    lineJoin: 'round',
    strokeThickness: 12,
  });

  const skewText = new Text('Hello World', skewStyle);
  skewText.skew.set(0.65, -0.3);
  skewText.anchor.set(0.5, 0.5);
  skewText.x = 200;
  skewText.y = 500;

  app.stage.addChild(skewText);

  const container = new Container();

  app.stage.addChild(container);

  const texture = Texture.from(Bunny);

  for (let i = 0; i < 25; i++) {
    const rabbit = new Sprite(texture);

    rabbit.anchor.set(0.5);
    rabbit.x = (i % 5) * 40;
    rabbit.y = Math.floor(i / 5) * 40;

    container.addChild(rabbit);
  }

  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2.5;

  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  app.ticker.add((delta) => {
    container.rotation -= 0.01 * delta;
  });

  useEffect(() => {
    innerRef.current.appendChild(app.view);
    app.start();

    return () => {
      app.stop();
    };
  });

  return <div className="App" ref={innerRef} />;
};

export default App;
