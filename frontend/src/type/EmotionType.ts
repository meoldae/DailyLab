type EmotionType = {
    imgsrc : string,
    color : string,
    name : string,
    state : string,
}
const emotionList: EmotionType[] = [
    {
        imgsrc: 'src/resources/img/emotion/moved.png',
        color: '#FF48B3',
        name: '감동',
        state: 'positive'
    },
    {
        imgsrc: 'src/resources/img/emotion/anger.png',
        color: '#FF4262',
        name: '분노',
        state: 'negative'
    },
    {
        imgsrc: 'src/resources/img/emotion/absurd.png',
        color: '#FF6832',
        name: '황당',
        state: 'negative'
    },
    {
        imgsrc: 'src/resources/img/emotion/joy.png',
        color: '#FF9324',
        name: '기쁨',
        state: 'positive'
    },
    {
        imgsrc: 'src/resources/img/emotion/happy.png',
        color: '#FFC725',
        name: '행복',
        state: 'positive'
    },
    {
        imgsrc: 'src/resources/img/emotion/proud.png',
        color: '#FFF725',
        name: '뿌듯',
        state: 'positive'
    },
    {
        imgsrc: 'src/resources/img/emotion/excited.png',
        color: '#9CD105',
        name: '신남',
        state: 'positive'
    },
    {
        imgsrc: 'src/resources/img/emotion/thankful.png',
        color: '#5DAE23',
        name: '감사',
        state: 'positive'
    },
    {
        imgsrc: 'src/resources/img/emotion/comfort.png',
        color: '#14A06F',
        name: '편안',
        state: 'positive'
    },
    {
        imgsrc: 'src/resources/img/emotion/stuffy.png',
        color: '#14B8BD',
        name: '답답',
        state: 'negative'
    },
    {
        imgsrc: 'src/resources/img/emotion/depression.png',
        color: '#19A8D5',
        name: '억울',
        state: 'negative'
    },
    {
        imgsrc: 'src/resources/img/emotion/sad.png',
        color: '#208FFF',
        name: '슬픔',
        state: 'negative'
    },
    {
        imgsrc: 'src/resources/img/emotion/panic.png',
        color: '#5A3BFF',
        name: '멘붕',
        state: 'negative'
    },
    {
        imgsrc: 'src/resources/img/emotion/annoy.png',
        color: '#7B1DE2',
        name: '짜증',
        state: 'negative'
    },
    {
        imgsrc: 'src/resources/img/emotion/tired.png',
        color: '#818181',
        name: '피곤',
        state: 'negative'
    },
];
export default emotionList;