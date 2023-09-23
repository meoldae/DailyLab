import React, { useEffect } from "react";
import Matter from "matter-js";
import { IChamfer } from 'matter-js';

const GyroscopeExample: React.FC = () => {
  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      Composites,
      MouseConstraint,
      Mouse,
      Composite,
      Bodies
    } = Matter;

    // create engine
    const engine = Engine.create();
    const world = engine.world;

    // create renderer
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        showAngleIndicator: true
      }
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    const stack = Composites.stack(20, 20, 10, 5, 0, 0, (x: number, y: number) => {
      const sides = Math.round(Math.random() * 7) + 1;

      // round the edges of some bodies
      let chamfer: IChamfer | undefined = undefined;
      if (sides > 2 && Math.random() > 0.7) {
        chamfer = {
          radius: 10
        };
      }

      switch (Math.round(Math.random())) {
        case 0:
          if (Math.random() < 0.8) {
            return Bodies.rectangle(
              x,
              y,
              Math.random() * 25 + 25,
              Math.random() * 25 + 25,
              { chamfer: chamfer }
            );
          } else {
            return Bodies.rectangle(
              x,
              y,
              Math.random() * 40 + 80,
              Math.random() * 5 + 25,
              { chamfer: chamfer }
            );
          }
        case 1:
          return Bodies.polygon(x, y, sides, Math.random() * 25 + 25, {
            chamfer: chamfer
          });
        default:
          return null;
      }
    });

    Composite.add(world, stack);
    Composite.add(world, Bodies.rectangle(400, 0, 800, 50, { isStatic: true }));
    Composite.add(world, Bodies.rectangle(400, 600, 800, 50, { isStatic: true }));
    Composite.add(world, Bodies.rectangle(800, 300, 50, 600, { isStatic: true }));
    Composite.add(world, Bodies.rectangle(0, 300, 50, 600, { isStatic: true }));


    // add gyro control
    if (typeof window !== "undefined") {
      const updateGravity = (event: DeviceOrientationEvent) => {
        const orientation =
          typeof window.orientation !== "undefined"
            ? window.orientation
            : 0;
        const gravity = engine.world.gravity;

        if(event.gamma !== null && event.beta !== null && event.beta !== null){
            if (orientation === 0) {
              gravity.x = Math.min(Math.max(event.gamma, -90), 90) / 90;
              gravity.y = Math.min(Math.max(event.beta, -90), 90) / 90;
            } else if (orientation === 180) {
              gravity.x = Math.min(Math.max(event.gamma, -90), 90) / 90;
              gravity.y = Math.min(Math.max(-event.beta, -90), 90) / 90;
            } else if (orientation === 90) {
              gravity.x = Math.min(Math.max(event.beta, -90), 90) / 90;
              gravity.y = Math.min(Math.max(-event.gamma, -90), 90) / 90;
            } else if (orientation === -90) {
              gravity.x = Math.min(Math.max(-event.beta, -90), 90) / 90;
              gravity.y = Math.min(Math.max(event.gamma, -90), 90) / 90;
            }
        }
      };

      window.addEventListener("deviceorientation", updateGravity);
    }

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
    });

    // Clean up the engine and renderer when component unmounts
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", updateGravity);
      }
    };
  }, []);

  return null;
};

export default GyroscopeExample;
