import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

const MatchSetting = (props: { text: string, children?: ReactNode, className?: string }) => {
    return (
        <div className={cn("flex justify-between", props.className)}>
            <h1 className="text-primary text-xl leading-8">{props.text}:</h1>
            {props.children}
        </div>
    )
}
 
export default MatchSetting