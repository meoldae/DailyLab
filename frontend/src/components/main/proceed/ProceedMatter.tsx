import { useEffect, useState } from "react";
import Matter from "matter-js";
import { getDailyData, getRatioData } from "@/api/Emotion";
import { EmotionResultType, EmotionRatioType } from "@/type/EmotionType";

interface props {
  date : string;
}

const ProceedMatter: React.FC<props> = ({ date }) => {
  const [emotionResultList, setEmontionResultList] = useState<EmotionResultType[]>([]);
  const [emotionRatioList, setEmontionRatioList] = useState<EmotionRatioType[]>([]);
  
  useEffect(() => {
    getDailyData({ date: date }, ({ data }) => {
      setEmontionResultList(() => data.data as EmotionResultType[]);
    }, (error) => { console.log(error) });
  }, []);
  
  useEffect(() => {
    const getRatio = async () => {
      if (emotionResultList.length >= 100) {
        await getRatioData(date, ({ data }) => {
          setEmontionRatioList(() => data.data as EmotionRatioType[]);
        }, (error) => { console.log(error) });
      }
    };

    void getRatio();
  }, [emotionResultList]);
    
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
    const world = newEngine.world;

    const canvas = document.getElementById("matterCanvasCon")!;
    // create renderer
    const render = Render.create({
      element: canvas,
      engine: newEngine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight - 70,
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
      const handleDeviceOrientation = (event:DeviceOrientationEvent) => {
        const orientation = typeof window.orientation !== "undefined" ? window.orientation : 0;
        const gravity = newEngine.world.gravity;

        if (event.gamma !== null && event.beta !== null && event.beta !== null) {
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

      const requestPermissionUser = () => {
        if (window.DeviceOrientationEvent !== undefined &&  typeof window.DeviceOrientationEvent.requestPermission === 'function') {
          window.DeviceOrientationEvent.requestPermission().then((state) => {
            if(state == 'granted') window.addEventListener("deviceorientation", handleDeviceOrientation);
          }).catch(e => {console.error(e)});
        } else {
          // For non-iOS 13+ devices
          window.addEventListener("deviceorientation", handleDeviceOrientation);
        }
      };

      requestPermissionUser();
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
    if (emotionResultList.length < 100) {
      for (let i = 0; i < emotionResultList.length; i++) {
        const x = 300 + Math.random() * 200;
        const y = -Math.random() * 50;
        const circleRadius = 40;
  
        Composite.add(world, Matter.Bodies.circle(x, y, circleRadius, {
            render: {
                sprite: {
                    texture: `./assets/img/emotion/${emotionResultList[i].emotionId}.png`,
                    xScale: (circleRadius *2) / 50,
                    yScale: (circleRadius *2) / 50,
                  },
            }
        }));
      }
    } else {
      for (let i = 0; i < emotionRatioList.length; i++) {
        const x = 300 + Math.random() * 10;
        const y = Math.random() * 10;
        const circleRadius = 40;
        
        for (let j = 0; j < emotionRatioList[i].percentage; j++) {
          Composite.add(world, Matter.Bodies.circle(x, y, circleRadius, {
              render: {
                  sprite: {
                      texture: `./assets/img/emotion/${emotionRatioList[i].emotionId}.png`,
                      xScale: (circleRadius *2) / 50,
                      yScale: (circleRadius *2) / 50,
                    },
              }
          }));
        }
      }
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

  }, [emotionResultList, emotionRatioList]);

  return null;
};

export default ProceedMatter;