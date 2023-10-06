import Info from '@/components/intro/Info';
import characters from './CharacterInfo';

const Intro = () => {
    const characterList = Object.values(characters);

    return (
        <div className="pb-8">
            <div className='my-12 text-center text-3xl font-bold'>
                연구원들을 소개합니다
            </div>
            <div className='px-10 child-[div:last-child]:mb-0'>
                {characterList.length>0 && characterList.map((c) => (
                    <Info name={c.name} imgsrc={c.imgsrc} desc={c.desc} color={c.color}/>
                ))}
            </div>
        </div>
    )
}

export default Intro;