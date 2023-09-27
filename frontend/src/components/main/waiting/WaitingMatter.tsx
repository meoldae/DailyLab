import { useEffect, useState } from "react";
import Matter from "matter-js";
import { redirect } from "react-router-dom";

interface WaitingMatterProps {
    clickCount: number;
    imgName: string;
  }
  
  const WaitingMatter = ({ clickCount, imgName }: WaitingMatterProps) => {
  const [engine, setEngine] = useState<Matter.Engine | undefined>(undefined);
  const [imgSrc, setImgSrc] = useState('');
  
  
  useEffect(() => {
    setImgSrc(imgName);
    console.log(imgName);
  },[imgName])
  
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

    // create engine
    const newEngine = Engine.create();
    setEngine(newEngine);
    const world = newEngine.world;

    const canvas = document.getElementById("matterCanvasCon")!;
    // create renderer
    const render = Render.create({
      element: canvas,
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
            gravity.x = Math.min(Math.max(event.gamma, -90), 90) / 10;
            gravity.y = Math.min(Math.max(event.beta, -90), 90) / 10;
          } else if (orientation === 180) {
            gravity.x = Math.min(Math.max(event.gamma, -90), 90) / 10;
            gravity.y = Math.min(Math.max(-event.beta, -90), 90) / 10;
          } else if (orientation === 90) {
            gravity.x = Math.min(Math.max(event.beta, -90), 90) / 10;
            gravity.y = Math.min(Math.max(-event.gamma, -90), 90) / 10;
          } else if (orientation === -90) {
            gravity.x = Math.min(Math.max(-event.beta, -90), 90) / 10;
            gravity.y = Math.min(Math.max(event.gamma, -90), 90) / 10;
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
    Composite.add(world, Matter.Bodies.rectangle(0, 100, 1000, 20, { isStatic: true, angle: Math.PI * 0.12, render: { fillStyle: '#208FFF' } }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 400, 1000, 20, { isStatic: true, angle: -Math.PI * 0.08, render: { fillStyle: '#12AB47' } }));
    Composite.add(world, Matter.Bodies.rectangle(0, 600, 1000, 20, { isStatic: true, angle: Math.PI * 0.12, render: { fillStyle: '#FF891A' } }));
    
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 100, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'} }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+180, 2000, 100, {isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'} }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'}  }));
    Composite.add(world, Matter.Bodies.rectangle(0, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'}  }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 100, { isStatic: true, render: {fillStyle: '#ff0000b9'} }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+180, 2000, 100, {isStatic: true, render: {fillStyle: '#535394'} }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#0059ff'}  }));
    // Composite.add(world, Matter.Bodies.rectangle(0, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#e100ff'}  }));
  
    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });
    
    // Clean up the engine and renderer when component unmounts
    return () => {
      if (newEngine) {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.Engine.clear(newEngine);

        if(render.canvas){
          render.canvas.remove();
        }
        if(render.canvas.parentNode){
          render.canvas.parentNode.removeChild(render.canvas);
        }
      }
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
            xScale: (circleRadius * 2) / 400,
            yScale: (circleRadius * 2) / 400,
          },
        },
      });
      Composite.add(engine.world, circle);
    }
  };
  useEffect(() => {
    addCircle();
  },[clickCount])

  return null;
};

export default WaitingMatter;