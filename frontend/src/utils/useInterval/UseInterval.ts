import { useRef, useEffect } from "react";

const UseInterval = (callback : () => void, interval: number | null) => {
    const savedCallback = useRef<(() => void) | null>(null);
    
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }

      if(interval !== null){
        const id = setInterval(tick, interval);
        return () => clearInterval(id);
      }
    }, [interval]);
  };

export default UseInterval;