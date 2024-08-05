import { cn } from "@/lib/utils/cn"
import type { ReactNode, WheelEventHandler } from "react"

const Container = (props: { 
    children?: ReactNode, 
    header?: string, 
    inner?: string, 
    outer?: string, 
    inset?: boolean,
    onWheel?: WheelEventHandler
}) => {
    return (
        <div className={cn("flex flex-col", props.outer)} onWheel={props.onWheel}>
            { props.header ? <Header text={props.header!} inset={props.inset} /> : null }

            <div className={cn("bg-container border rounded-lg p-2 h-full", props.inner)}>
                {props.children}
            </div>
        </div>
    )
}

const Header = (props: { text: string, inset?: boolean }) => {
    return <h1 className={cn(
        "text-sm font-bold text-secondary pl-4",
        { "pl-2": props.inset }
    )}>
        {props.text}
    </h1>
}

export default Container