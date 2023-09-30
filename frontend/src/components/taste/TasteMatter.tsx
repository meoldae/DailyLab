import { useEffect, useState } from "react";
import Matter from "matter-js";
import { cloeImg } from "../character/Character";
import { getDailyData } from "@/api/Emotion";
import { EmotionResultType } from "@/type/EmotionType";
import { toStringByFormatting } from "@/utils/date/DateFormatter";
  
interface TasteProps {
  date : string;
}

const TasteMatter: React.FC<TasteProps> = ({ date }) => {
  const [engine, setEngine] = useState<Matter.Engine | undefined>(undefined);
  const [emotionResultList, setEmontionResultList] = useState<EmotionResultType[]>([]);

  useEffect(() => {
    const getData = async () => {
        await getDailyData({date: date}, ({data}) => {
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
      Events,
    } = Matter;
    
    // create engine
    const newEngine = Engine.create();
    setEngine(newEngine);
    const world = newEngine.world;

    const canvas = document.getElementById("matterCanvasCon")! as HTMLCanvasElement;
    
    // create renderer
    const render = Render.create({
      element: canvas,
      engine: newEngine,
      options: {
        width: 300,
        height: 100,
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

    // Composite.add(world, Matter.Bodies.rectangle(50, 50, 1000, 100, { isStatic: true, render: {fillStyle: '#222222'} }));
    // Composite.add(world, Matter.Bodies.rectangle(canvas.width+50, canvas.height+50, 2000, 100, {isStatic: true, render: {fillStyle: '#ff6969'} }));
    const bottom = Matter.Bodies.rectangle(150, 150, 300, 100, { isStatic: true, render: {fillStyle: '#2222220'} });
    const top = Matter.Bodies.rectangle(150, -50, 300, 100, { isStatic: true, render: {fillStyle: '#2222220'} });
    const left = Matter.Bodies.rectangle(-50, 50, 100, 300, { isStatic: true, render: {fillStyle: '#2222220'} });
    const right = Matter.Bodies.rectangle(350, 50, 100, 300, { isStatic: true, render: {fillStyle: '#2222220'} });

    Composite.add(world, [bottom, top, left, right]);

    for(let i = 0; i < emotionResultList.length; i++) {
        const x = 120+Math.random()*50;
        const y = Math.random()*10;
        const circleRadius = 10;
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
      max: { x: 300, y: 100 },
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

export default TasteMatter;