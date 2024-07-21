import ConfigInput from "@/components/simulation/pack/config/input/ConfigInput"
import { cn } from "@/lib/utils/cn"
import { type ChangeEvent, type WheelEvent } from "react"

const NumberInput = (props: { 
    header: string
    value: number,
    setValue: (value: number) => void,
    step: number
    min?: number,
    max?: number,
}) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        props.setValue(clamp(!isNaN(value) ? value : 0))
    }

    const clamp = (value: number) => {
        const min = Math.max(...[value, props.min].filter(_ => _ != undefined))
        return Math.min(...[min, props.max].filter(_ => _ != undefined))
    }

    const step = (value: number) => {
        props.setValue(Math.round(clamp(props.value + value) * 100) / 100)
    }

    const handleWheel = (event: WheelEvent) => {
        step(props.step * (event.deltaY < 0 ? 1 : -1))
    }

    return (
        <ConfigInput 
            header={props.header}
            value={props.value}
            onChange={handleChange}
            style={{ MozAppearance: "textfield" }}
            type="number"
            valid={true}
            step={props.step}
            onWheel={handleWheel}
            container="flex border rounded-md gap-[2px]"
            input="border-none rounded-[5px] rounded-r-none"
        >   
            <div className="flex flex-col gap-[2px]">
                <NumberInputButton 
                    text="+"
                    onClick={() => step(props.step)}
                    className="rounded-tr-[4px]"
                />
                <NumberInputButton
                    text="-"
                    onClick={() => step(-props.step)}
                    className="rounded-br-[4px]"
                />
            </div>
        </ConfigInput>
    )
}

const NumberInputButton = (props: { text: string, onClick: () => void, className?: string }) => {
    return (
        <button 
            onClick={props.onClick}
            className={cn("bg-element w-8 h-full text-primary text-sm", props.className)}
        >
            {props.text}
        </button>
    )
}

export default NumberInput