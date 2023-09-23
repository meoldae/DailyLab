import { useEffect } from "react"

const Emotion = () => {
    let lastAlpha: number | null = null
    let lastBeta: number | null = null
    let lastGamma: number | null = null

    function handleOrientation(event: DeviceOrientationEvent) {
        const { alpha, beta, gamma } = event
    
        if (lastAlpha === null || lastBeta === null || lastGamma === null) {
          lastAlpha = alpha
          lastBeta = beta
          lastGamma = gamma
          return
        }
    
        if (alpha && beta && gamma) {
          const alphaDiff = Math.abs(alpha - lastAlpha)
          const betaDiff = Math.abs(beta - lastBeta)
          const gammaDiff = Math.abs(gamma - lastGamma)
    
          if (betaDiff > 50 || gammaDiff > 50 || alphaDiff > 90) {
            // 휴대전화가 흔들렸을 때 실행할 코드를 여기에 작성합니다.
            navigator.vibrate([100, 100, 100, 100])
            console.log("293874293874")
          }
        }
    
        lastAlpha = alpha
        lastBeta = beta
        lastGamma = gamma
      }

    useEffect(() => {
        window.addEventListener("deviceorientation", handleOrientation)
    
        return () => {
          window.removeEventListener("deviceorientation", handleOrientation)
        }
      }, [])
    
    return (
        <div className="">
            alpha : {lastAlpha}
            gamma : {lastGamma}
            beta : {lastBeta}
        </div>
    )
}

export default Emotion;