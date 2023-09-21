interface props {
    idx : number,
    name : string,
    buttonClickStatus : boolean,
    XStatus : boolean,
    activeStatus? : boolean,
    clickEvent : (idx: number) => void,
}

const CustomKeyword = (data: props) => {
    return (
        <div>
            {data.name}
        </div>
    )
}

export default CustomKeyword;