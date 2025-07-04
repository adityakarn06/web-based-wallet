
interface ButtonInputProp {
    onClickFn: () => void;
    text: string
}

export default function Button({ onClickFn, text}: ButtonInputProp) {
    return (
        <button className="py-2 px-3 text-sm border bg-white/90 text-black cursor-pointer rounded hover:bg-white hover:text-black hover:font-medium" onClick={onClickFn}>
                  {text}
        </button>
    )
}