import { useEffect, useState } from "react";

const Emotion = () => {
    const [alpha, setAlpha] = useState<number | null>(null);
    const [beta, setBeta] = useState<number | null>(null);
    const [gamma, setGamma] = useState<number | null>(null);

    useEffect(() => {
        const handleOrientationChange = (event: DeviceOrientationEvent) => {
            setAlpha(event.alpha);
            setBeta(event.beta);
            setGamma(event.gamma);
        }

        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', handleOrientationChange);
        } else {
            alert("이 브라우저에서는 기기 방향 이벤트를 지원하지 않습니다.");
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientationChange);
        }
    }, [])

    return (
        <div className="">
            alpha : {alpha}
            gamma : {gamma}
            beta : {beta}
        </div>
    );
};

export default Emotion;
