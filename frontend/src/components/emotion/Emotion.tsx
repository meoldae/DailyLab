import { useEffect, useState } from "react";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
}

const Emotion = () => {
    const [alpha, setAlpha] = useState<number | null>(null);
    const [beta, setBeta] = useState<number | null>(null);
    const [gamma, setGamma] = useState<number | null>(null);

    let requestPermissionFn: (() => Promise<'granted' | 'denied'>) | undefined;

    if ('DeviceOrientationEvent' in window) {
        requestPermissionFn = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;
    }

    function requestOrientationPermission() {
        if (requestPermissionFn) {
            requestPermissionFn()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', (event) => {
                            setAlpha(event.alpha);
                            setBeta(event.beta);
                            setGamma(event.gamma);
                            console.log(`${event.alpha} : ${event.beta} : ${event.gamma}`);
                        });
                    }
                })
                .catch(console.error);
        }
    }

    useEffect(() => {
        void requestOrientationPermission();
    }, []);

    return (
        <div className="">
            alpha : {alpha}
            gamma : {gamma}
            beta : {beta}
        </div>
    );
};

export default Emotion;
