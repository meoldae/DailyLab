interface TutorialProps {
    imgsrc: string;
    name: string;
    desc: string;
    color: string;
  }

const TutorialItem: React.FC<TutorialProps> = ({ imgsrc, name, desc, color }) => {

    return(
        <div className="h-[70vh] p-[20px] flex flex-col items-center justify-center">
            <img className="w-[200px] mt-20 mb-16" src={imgsrc} alt="" />
            <div className="text-center">
                <p className="font-extrabold mb-8 text-3xl">
                    <p className="inline-block" style={{ color: color }}>{name}</p> 연구원
                </p>
                <p className="text-2xl" dangerouslySetInnerHTML={{__html: desc}}></p>
            </div>
        </div>
    )
}

export default TutorialItem;