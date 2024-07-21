import { cn } from "@/lib/utils/cn"
import { 
    type ChangeEvent, 
    type CSSProperties, 
    type HTMLInputTypeAttribute, 
    type ReactNode,
    type WheelEventHandler
} from "react"

const ConfigInput = (props: {
    header: string,
    type: HTMLInputTypeAttribute,
    value: any,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    valid: boolean,
    min?: number,
    max?: number,
    step?: number,
    style?: CSSProperties,
    children?: ReactNode,
    container?: string,
    input?: string
    onWheel?: WheelEventHandler
}) => {
    return (
        <div className="flex flex-col" onWheel={props.onWheel}>
            <h1 className="text-secondary pl-2 font-bold text-sm">
                {props.header}
            </h1>
            <div className={props.container}>
                <input 
                    type={props.type}
                    className={cn(
                        "border bg-element rounded-md p-2 text-2xl text-primary w-full transition-colors",
                        { "bg-invalid": !props.valid },
                        props.input
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