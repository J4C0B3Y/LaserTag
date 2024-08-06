import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

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
