import { cn } from "@/lib/utils/cn"
import { type ChangeEvent, type CSSProperties, type HTMLInputTypeAttribute, type ReactNode, type WheelEventHandler } from "react"

const ConfigInput = (props: {
    /**
     * The input header.
     */
    header: string,

    /**
     * The input type.
     */
    type: HTMLInputTypeAttribute,

    /**
     * The input value.
     */
    value: any,

    /**
     * Called the the input value changes.
     * 
     * @param event The change evnt.
     */
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,

    /**
     * If the input is valud.
     */
    valid: boolean,

    /**
     * The min input value.
     */
    min?: number,

    /**
     * The max input value.
     */
    max?: number,

    /**
     * The value step.
     */
    step?: number,

    /**
     * Raw css styles.
     */
    style?: CSSProperties,

    /**
     * Buttons to add to the input.
     */
    children?: ReactNode,

    /**
     * The input outer className.
     */
    outer?: string,

    /**
     * The input inner className.
     */
    inner?: string

    /**
     * Called when the container is scrolled on.
     */
    onWheel?: WheelEventHandler
}) => {
    return (
        <div className="flex flex-col" onWheel={props.onWheel}>
            <h1 className="text-secondary pl-2 font-bold text-sm">
                {props.header}
            </h1>
            <div className={props.outer}>
                <input 
                    type={props.type}
                    className={cn(
                        "border bg-element rounded-md p-2 text-2xl text-primary w-full transition-colors",
                        { "bg-invalid": !props.valid }, // Change background to red if the value is invalid.
                        props.inner
                    )}
                    value={props.value}
                    onChange={props.onChange}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    style={props.style}
                />
                {props.children}
            </div>
        </div>
    )
}

export default ConfigInput