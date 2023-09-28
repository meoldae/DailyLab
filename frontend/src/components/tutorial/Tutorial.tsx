import { useRef, useState } from "react"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/components/tutorial/slick.css'
import TutorialItem from "./TutorialItem";
import characters from "../intro/CharacterInfo";
import TutorialFirst from "./TutorialFirst";
import TutorialLast from "./TutorialLast";

type SliderType = {
    slickGoTo: (slide: number) => void;
  };

const Tutorial = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const characterList = Object.values(characters);
    const sliderRef = useRef<SliderType>(null!);

    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        ref: (slider: SliderType) => {
            sliderRef.current = slider;
          },
        beforeChange: (oldIndex: number, newIndex: number) => {
          setCurrentSlide(newIndex)
        },
        afterChange: (current: number) => {
          setCurrentSlide(current)
        },
      }

      const handleSkipButton = () => {
        sliderRef.current?.slickGoTo(6);
      }
      
    return (
        <div className="p-[20px]">
            <div className="mr-4 mt-4 text-right">
                <button className="text-2xl font-semibold" onClick={handleSkipButton}>
                    건너뛰기
                </button>
            </div>
            <Slider {...settings} className="child-[div]:h-[80vh]">
                <TutorialFirst/>
                {characterList.length>0 && characterList.map((c) => (
                    <TutorialItem name={c.name} imgsrc={c.imgsrc} desc={c.desc} color={c.color}/>
                    ))}
                <TutorialLast/>
            </Slider>
        </div>
    )
}

export default Tutorial;