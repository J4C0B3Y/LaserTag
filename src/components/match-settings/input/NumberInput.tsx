import { useRef } from "react"

const NumberInput = (props: { 
    value: number, setValue: (value: number) => void, 
    min: number, max: number
}) => {
    const input = useRef<HTMLInputElement>(null)

    const handleClick = (step: number) => {
        props.setValue(clamp(input.current!.valueAsNumber + step))
    }

    const clamp = (value: number) => {
        return Math.min(Math.max(value, props.min), props.max)
    }

    return (
        <div className="border-2 border-stone-500 rounded overflow-hidden flex gap-[2px] bg-stone-500">
            <NumberInputButton text="-" onClick={() => handleClick(-1)} />
            <input
                className="text-center font-semibold"
                type="number"
                value={props.value}
                min={props.min}
                max={props.max}
                onChange={(event) => props.setValue(clamp(event.target.valueAsNumber))}
                style={{ MozAppearance: "textfield" }}
                ref={input}
            />
            <NumberInputButton text="+" onClick={() => handleClick(1)} />
        </div>
    )
}

const NumberInputButton = (props: { text: string, onClick: () => void }) => {
    return (
        <button
            className="w-7 text-center font-semibold bg-stone-300"
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default NumberInput