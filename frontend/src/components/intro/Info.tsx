interface InfoProps {
    imgsrc: string;
    name: string;
    desc: string;
    color: string;
  }

const Info: React.FC<InfoProps> = ({ imgsrc, name, desc, color }) => {
    return (
        <div className="mx-auto mb-8 max-w-xl py-8 pr-8 flex items-center rounded-2xl bg-primary">
            <img className="ml-3 w-[90px]" src={imgsrc} alt="" />
            <div className="ml-2 flex-1">
                <div className="mb-3 text-xl font-bold" style={{color:color}}>
                    {name}
                </div>
                <div className="font-light break-keep" dangerouslySetInnerHTML={{__html: desc}}>
                </div>
            </div>
        </div>
    )
}

export default Info;