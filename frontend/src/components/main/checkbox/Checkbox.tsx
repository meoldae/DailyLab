interface CheckboxProps {
    state: boolean;
    content: string;
    type?: string;
  }

const Checkbox: React.FC<CheckboxProps> = ({ state, content }) => {
    return (
        <div className="w-full p-4 bg-secondary h-16 rounded-xl flex items-center">
            <img className="mr-4 w-[20px]" src={state ? "src/resources/img/checkbox/checkbox_fill.png" : "src/resources/img/checkbox/checkbox_empty.png"}  alt="" />
            <div className={state ? "font-medium line-through" : "font-medium"}>
                {content}
            </div>
        </div>
    )
}

export default Checkbox;