import { useEffect } from "react";
import Matter from "matter-js";
// import { IChamfer } from 'matter-js';

const Emotion = () => {
  useEffect(() => {
    navigator.vibrate(200000); 
    
    const {
      Engine,
      Render,
      Runner,
      Composites,
      MouseConstraint,
      Mouse,
      Composite,
      Bodies,
      Events 
    } = Matter;

    let hasVibrated = false;

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
        wireframes: false,
        background: 'transparent'
      }
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    const stack = Composites.stack(20, 20, 10, 5, 0, 0, (x: number, y: number) => {

        const textureSize = 467;
        const circleRadius = 40;
        return Bodies.circle(
            x,
            y,
            circleRadius,
            {
            render: {
                sprite: {
                    texture: "./assets/img/emotion/1.png",
                    xScale: (circleRadius*2)/textureSize,
                    yScale: (circleRadius*2)/textureSize,
                },
            },
            }
        );
    });

    Composite.add(world, stack);
    Composite.add(world, Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 10, { isStatic: true, render: {fillStyle: '#ff0000'} }));
    Composite.add(world, Bodies.rectangle(window.innerWidth, window.innerHeight+130, 1000, 10, {isStatic: true, render: {fillStyle: '#535394'} }));
    Composite.add(world, Bodies.rectangle(window.innerWidth*2+20, 300, 10, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#0059ff'}  }));
    Composite.add(world, Bodies.rectangle(0, 300, 10, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#e100ff'}  }));


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
              gravity.x = Math.min(Math.max(event.gamma, -90), 90) / 40;
              gravity.y = Math.min(Math.max(event.beta, -90), 90) / 40;
            } else if (orientation === 180) {
              gravity.x = Math.min(Math.max(event.gamma, -90), 90) / 40;
              gravity.y = Math.min(Math.max(-event.beta, -90), 90) / 40;
            } else if (orientation === 90) {
              gravity.x = Math.min(Math.max(event.beta, -90), 90) / 40;
              gravity.y = Math.min(Math.max(-event.gamma, -90), 90) / 40;
            } else if (orientation === -90) {
              gravity.x = Math.min(Math.max(-event.beta, -90), 90) / 40;
              gravity.y = Math.min(Math.max(event.gamma, -90), 90) / 40;
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

    // Add an event handler for collision
    Events.on(engine, 'collisionStart', (event) => {
    // Iterate through all pairs of collision events
    event.pairs.forEach((pair) => {
        // Check if one of the bodies is a circle and the other is a rectangle
        if (
        (pair.bodyA.label === 'Circle Body' && pair.bodyB.label === 'Rectangle Body') ||
        (pair.bodyA.label === 'Rectangle Body' && pair.bodyB.label === 'Circle Body')
        ) {
        // Check if vibration has not been triggered yet
        if (!hasVibrated) {
            // Trigger vibration
            console.log("vib")
            navigator.vibrate(100); // Vibrate for 100ms (adjust as needed)
            hasVibrated = true; // Set flag to true to prevent repeated vibration
        }
        }
    });
    });

    // Clean up the engine and renderer when component unmounts
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    };
    
  }, []);

  return null
};

export default Emotion;
