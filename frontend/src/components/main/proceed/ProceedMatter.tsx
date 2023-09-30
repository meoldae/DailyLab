import { useEffect, useState } from "react";
import Matter from "matter-js";
import { getDailyData } from "@/api/Emotion";
import { EmotionResultType } from "@/type/EmotionType";
import { toStringByFormatting } from "@/utils/date/DateFormatter";


  const ProceedMatter = () => {
  const [engine, setEngine] = useState<Matter.Engine | undefined>(undefined);
  const [emotionResultList, setEmontionResultList] = useState<EmotionResultType[]>([]);
  const curDate = toStringByFormatting(new Date());
  
  
  useEffect(() => {
    const getData = async () => {
        await getDailyData({date: curDate}, ({data}) => {
            setEmontionResultList(() => data.data as EmotionResultType[]);
        }, (error) => { console.log(error) });
    };
    
    void getData();
}, []);
  
  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      MouseConstraint,
      Mouse,
      Composite,
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
        height: window.innerHeight,
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

    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 100, { isStatic: true, render: {fillStyle: '#ff0000b9'} }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+180, 2000, 100, {isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'} }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'}  }));
    Composite.add(world, Matter.Bodies.rectangle(0, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'}  }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 100, { isStatic: true, render: {fillStyle: '#ff0000b9'} }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+180, 2000, 100, {isStatic: true, render: {fillStyle: '#535394'} }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#0059ff'}  }));
    // Composite.add(world, Matter.Bodies.rectangle(0, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#e100ff'}  }));
    console.log(emotionResultList.length);
    for(let i = 0; i < emotionResultList.length; i++) {
      const x = 300+Math.random()*10;
      const y = Math.random()*10;
      const circleRadius = 40;
      Composite.add(world, Matter.Bodies.circle(x, y, circleRadius, {
          render: {
              sprite: {
                  texture: `./assets/img/emotion/${emotionResultList[i].emotionId}.png`,
                  xScale: (circleRadius *2) / 467,
                  yScale: (circleRadius *2) / 467,
                },
          }
      }));
    }

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 300 },
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

  }, [emotionResultList]);

  return null;
};

export default ProceedMatter;