import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

const Header = (props: { text: string }) => {
    return <h1 className="text-sm font-bold text-secondary pl-4">{props.text}</h1>
}

const Container = (props: { children?: ReactNode, header?: string, inner?: string, outer?: string, }) => {
    return (
        <div className={cn("flex flex-col", props.outer)}>
            { props.header ? <Header text={props.header!} /> : null }

            <div className={cn("bg-container border rounded-lg p-2 h-full", props.inner)}>
                {props.children}
            </div>
        </div>
    )
}

export default Container