import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const MatchSetting = (props: { 
    /**
     * The label to display next to the input.
     */
    text: string, 

    /**
     * The input to put in the setting.
     */
    children?: ReactNode, 

    /**
     * The setting className.
     */
    className?: string 
}) => {
    return (
        <div className={cn("flex justify-between", props.className)}>
            <h1 className="text-primary text-xl leading-8">{props.text}:</h1>
            {props.children}
        </div>
    )
}
 
export default MatchSetting
