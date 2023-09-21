interface props {
    insertStatus : boolean,
    handleInsert : () => void,
}

const CustomHobbyList = (data: props) => {

    
    return (
        <div>
            {!data.insertStatus ?
            <button type="button" onClick={data.handleInsert} className="rounded-[10px] px-[14px] py-[6px] bg-reverse-primary text-[13px] font-bold text-primary">추가</button>
            : null}
        </div>
    )
}

export default CustomHobbyList;