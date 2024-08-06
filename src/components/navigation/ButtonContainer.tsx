import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

const ButtonContainer = (props: { 
    /**
     * The buttons to put in the container.
     */
    children?: ReactNode, 

    /**
     * The div className.
     */
    className?: string
}) => {
    return (
        <div className={cn("flex flex-1 gap-2", props.className)}>
            {props.children}
        </div>
    )
}

export default ButtonContainer
