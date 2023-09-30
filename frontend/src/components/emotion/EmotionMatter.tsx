import { useEffect, useState } from "react";
import { getDailyData, getRatioData } from "@/api/Emotion";
import { EmotionResultType, EmotionRatioType } from "@/type/EmotionType";
import Matter from "matter-js";
import { toStringByFormatting } from "@/utils/date/DateFormatter";

interface EmotionMatterProps {
  circleCount: number;
  emotionNo: number;
}

const EmotionMatter = ({ circleCount, emotionNo }: EmotionMatterProps) => {
  const [engine, setEngine] = useState<Matter.Engine | undefined>(undefined);
  const [emotionResultList, setEmontionResultList] = useState<EmotionResultType[]>([]);
  const [emotionRatioList, setEmontionRatioList] = useState<EmotionRatioType[]>([]);
  const imgSrc = `./assets/img/emotion/${emotionNo}.png`;
  const curDate = toStringByFormatting(new Date());

  useEffect(() => {
    const getData = async () => {
      await getDailyData({ date: curDate }, ({ data }) => {
      setEmontionResultList(() => data.data as EmotionResultType[]);
      }, (error) => { console.log(error) });
    };
    
    void getData();
  }, []);
  
  useEffect(() => {
    const getRatio = async () => {
      if (emotionResultList.length >= 100) {
        await getRatioData(curDate, ({ data }) => {
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
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 10, { isStatic: true, render: {fillStyle: '#ff0000'} }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+160, 1000, 10, {isStatic: true, render: {fillStyle: '#535394'} }));
    // Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 10, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#0059ff'}  }));
    // Composite.add(world, Matter.Bodies.rectangle(0, 300, 10, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#e100ff'}  }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 100, { isStatic: true, render: {fillStyle: '#ff00000'} }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+180, 2000, 100, {isStatic: true, render: {fillStyle: '#ff00000'} }));
    Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#ff00000'}  }));
    Composite.add(world, Matter.Bodies.rectangle(0, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#ff00000'}  }));
    
    // 기존 감정 갖고 오기
    if (emotionResultList.length < 100) {
      for (let i = 0; i < emotionResultList.length; i++) {
        const x = 300 + Math.random() * 100;
        const y = Math.random() * 700;
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
    } else {
      for (let i = 0; i < emotionRatioList.length; i++) {
        const x = 300 + Math.random() * 10;
        const y = Math.random() * 10;
        const circleRadius = 40;
  
        for (let j = 0; j < emotionRatioList[i].percentage / 2; j++) {
          Composite.add(world, Matter.Bodies.circle(x, y, circleRadius, {
              render: {
                  sprite: {
                      texture: `./assets/img/emotion/${emotionRatioList[i].emotionId}.png`,
                      xScale: (circleRadius *2) / 467,
                      yScale: (circleRadius *2) / 467,
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

  }, [emotionResultList, emotionRatioList]);

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
  },[circleCount]);

  return null;
};

export default EmotionMatter;