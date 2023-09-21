import Info from '@/components/intro/Info';

interface characterInfoType{
    imgsrc: string
    name: string
    desc: string
    color:string
}

interface characterList {
    [key: string]: characterInfoType;
}

const characters: characterList = {
    char1: {
        imgsrc: './resources/img/character/coco_clothes_2.png',
        name: '연구소장 코코',
        desc: `몸집은 제일 작지만 연구소의 대장을 맡고있다.<br/>
        주요 업무는 연구원들 감시하기다.<br/>
        연구소를 돌아다니다 보면 화를 내고있는 코코를 만날수도..?`,
        color: '#FA4949',
    },
    char2: {
        imgsrc: './resources/img/character/ian_2.png',
        name: '할일담당 이안',
        desc: `마르코에게 받은 자료를 분석해 할 일을 만든다.<br/>
        작성한 할 일 목록을 소중하게 품에 안고 다닌다.<br/>
        연구소의 점심 메뉴 선정을 책임지고 있다.<br/>
        제일 좋아하는 메뉴는 갈비찜이다.`,
        color: '#FF891A'
    },
    char3: {
        imgsrc: './resources/img/character/diego_2.png',
        name: '일기담당 디에고',
        desc: `이안에게 자료를 받으면 일기를 작성한다.<br/>
        항상 같은 펜을 들고다닌다. <br/>
        일주일에 한번씩 문구점에 펜을 쇼핑하는 것이 가장 큰 낙이다.`,
        color: '#208FFF'
    },
    char4: {
        imgsrc: './resources/img/character/marco_2.png',
        name: '분석담당 마르코',
        desc: `받은 자료를 통해서 성향을 파악한다.<br/>
        꼼꼼한 성격으로 늘 연구소에 제일 먼저 출근한다.<br/>
        늘 실험실에서 연구에 몰두한다.<br/>
        연구소에서 가끔씩 폭발하는 소리의 주인공이다.`,
        color: '#12AB47'
    },
    char5: {
        imgsrc: './resources/img/character/cloe_2.png',
        name: '감정담당 클로에',
        desc: `감정을 수집하고 분석한다.<br/>
        수줍은 성격으로 분석 결과를 발표할 때 긴장한다.<br/>
        잠이 많아서 실험실 구석에서 종종 낮잠을 잔다.<br/>
        가끔씩 코코에게 혼나는 모습을 볼 수 있다.`,
        color: '#FFC624'
    },
};
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