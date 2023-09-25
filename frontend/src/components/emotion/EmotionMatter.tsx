import { useEffect, useState } from "react";
import Matter from "matter-js";

interface EmotionMatterProps {
  circleCount: number;
  emotionNo: number;
}

const EmotionMatter = ({ circleCount, emotionNo }: EmotionMatterProps) => {
  const [engine, setEngine] = useState<Matter.Engine | undefined>(undefined);
  const [imgSrc, setImgSrc] = useState("");
  
  
  useEffect(() => {
    setImgSrc(`./assets/img/emotion/${emotionNo}.png`);
  },[emotionNo])
  
  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      MouseConstraint,
      Mouse,
      Composite,
      Events,
    } = Matter;

    let hasVibrated = false;

    // create engine
    const newEngine = Engine.create();
    setEngine(newEngine);
    const world = newEngine.world;

    // create renderer
    const render = Render.create({
      element: document.body,
      engine: newEngine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight-70,
        wireframes: false,
        background: "transparent",
      },
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, newEngine);

    // Add an event handler for collision
    Events.on(newEngine, 'collisionStart', (event) => {
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
            console.log("vib");
            navigator.vibrate(100); // Vibrate for 100ms (adjust as needed)
            hasVibrated = true; // Set flag to true to prevent repeated vibration
          }
        }
      });
    });

    // add gyro control
    if (typeof window !== "undefined") {
      const updateGravity = (event: DeviceOrientationEvent) => {
        const orientation =
          typeof window.orientation !== "undefined"
            ? window.orientation
            : 0;
        const gravity = newEngine.world.gravity;

        if (
          event.gamma !== null &&
          event.beta !== null &&
          event.beta !== null
        ) {
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
    const mouseConstraint = MouseConstraint.create(newEngine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 10, { isStatic: true, render: {fillStyle: '#ff0000'} }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+160, 1000, 10, {isStatic: true, render: {fillStyle: '#535394'} }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 10, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#0059ff'}  }));
    // Composite.add(world, Matter.Bodies.rectangle(0, 300, 10, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#e100ff'}  }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 10, { isStatic: true, render: {fillStyle: '#0000000'} }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+170, 1000, 10, {isStatic: true, render: {fillStyle: '#0000000'} }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 10, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#0000000'}  }));
    Composite.add(world, Matter.Bodies.rectangle(0, 300, 10, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#0000000'}  }));
  

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });
    
    // Clean up the engine and renderer when component unmounts
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    };


  }, []);

  const addCircle = () => {
    if (engine) {
      const { Bodies, Composite } = Matter;
      const x = window.innerWidth/2 + Math.random() * (window.innerWidth);
      const y = -(Math.random() * window.innerHeight)/10-100;
      const circleRadius = 40;
      const circle = Bodies.circle(x, y, circleRadius, {
        render: {
          sprite: {
            texture: imgSrc,
            xScale: (circleRadius * 2) / 467,
            yScale: (circleRadius * 2) / 467,
          },
        },
      });
      Composite.add(engine.world, circle);
    }
  };
  
  useEffect(() => {
    addCircle();
  },[circleCount])

  return null;
};

export default EmotionMatter;