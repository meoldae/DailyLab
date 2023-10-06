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
        imgsrc: '/assets/img/character/marco_2.png',
        name: '성향 파악',
        desc: `사용자의 데이터를 수집해 성향을 파악한다.<br/>
        꼼꼼한 성격으로 늘 연구소에 제일 먼저 출근한다.<br/>
        늘 실험실에서 연구에 몰두한다.<br/>
        연구소에서 가끔씩 폭발하는 소리의 주인공이다.`,
        color: '#12AB47'
    },
    char2: {
        imgsrc: '/assets/img/character/ian_2.png',
        name: '할일 추천',
        desc: `성향 파악 자료를 분석해 할 일을 만든다.<br/>
        작성한 할 일 목록을 소중하게 품에 안고 다닌다.<br/>
        연구소의 점심 메뉴 선정을 책임지고 있다.<br/>
        제일 좋아하는 메뉴는 갈비찜이다.`,
        color: '#FF891A'
    },
    char3: {
        imgsrc: '/assets/img/character/diego_2.png',
        name: '일지 작성',
        desc: `하루를 마무리하고 나면 입력받은 할 일 목록과<br/> 감정을 통해 일지를 작성한다.<br/>
        항상 같은 펜을 들고다닌다. <br/>
        일주일에 한번씩 문구점에서 펜을 쇼핑한다.`,
        color: '#208FFF'
    },
    char4: {
        imgsrc: '/assets/img/character/cloe_2.png',
        name: '감정 및 맛',
        desc: `감정을 수집하고 분석해 맛을 추출한다.<br/>
        잠이 많아서 실험실 구석에서 종종 낮잠을 잔다.<br/>
        가끔씩 대장에게 혼나는 모습을 볼 수 있다.`,
        color: '#FFC624'
    },
    char5: {
        imgsrc: '/assets/img/character/coco_clothes_2.png',
        name: '대장',
        desc: `몸집은 제일 작지만 연구소의 대장을 맡고있다.<br/>
        주요 업무는 연구원들 감시하기다.<br/>
        연구소를 돌아다니다 보면 화를 내고있는 모습을 보게 될 지도..?`,
        color: '#FA4949',
    },
};

export default characters;