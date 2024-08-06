import ConfigInput from "@/components/simulation/pack/config/input/ConfigInput"
import NumberInputButton from "@/components/simulation/pack/config/input/impl/number/NumberInputButton"
import { type ChangeEvent, type WheelEvent } from "react"

const NumberInput = (props: { 
    /**
     * The input header.
     */
    header: string

    /**
     * The input value.
     */
    value: number,

    /**
     * The function to set the input value.
     * 
     * @param value The input value.
     */
    setValue: (value: number) => void,

    /**
     * The value step.
     */
    step: number

    /**
     * The min input value.
     */
    min?: number,

    /**
     * The max input value.
     */
    max?: number,
}) => {
    /**
     * Set the value when the input value is changed.
     * 
     * @param event The input change event.
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        props.setValue(clamp(!isNaN(value) ? value : 0))
    }

    /**
     * Clamps the value.
     * 
     * @param value The value.
     * @returns The clamped value.
     */
    const clamp = (value: number) => {
        const min = Math.max(...[value, props.min].filter(_ => _ != undefined))
        return Math.min(...[min, props.max].filter(_ => _ != undefined))
    }

    /**
     * Steps the current value by a new value.
     * 
     * @param value The value to scroll by.
     */
    const step = (value: number) => {
        props.setValue(Math.round(clamp(props.value + value) * 100) / 100)
    }

    /**
     * Steps the value when the input is scrolled.
     * 
     * @param event The wheel event.
     */
    const handleWheel = (event: WheelEvent) => {
        // If the scroll deltaY is less then zero,
        // step by one else step by negative one.
        step(props.step * (event.deltaY < 0 ? 1 : -1))
    }

    return (
        <ConfigInput 
            header={props.header}
            value={props.value}
            onChange={handleChange}
            type="number"
            valid={true}
            step={props.step}
            onWheel={handleWheel}
            outer="flex border rounded-md gap-[2px]"
            inner="border-none rounded-[5px] rounded-r-none"
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



export default NumberInput
