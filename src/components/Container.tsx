import type { ReactNode, WheelEventHandler } from "react"
import { cn } from "@/lib/utils/cn"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * A padded, styled container with rounding and a border.
 */
const Container = (props: { 
    /**
     * The container contents.
     */
    children?: ReactNode, 

    /**
     * The container header.
     */
    header?: string, 

    /**
     * The container inner className.
     */
    inner?: string, 

    /**
     * The container outer className.
     */
    outer?: string, 

    /**
     * If the header should be inset.
     */
    inset?: boolean,

    /**
     * Called when the container is scrolled on.
     */
    onWheel?: WheelEventHandler
}) => {
    return (
        <div className={cn("flex flex-col", props.outer)} onWheel={props.onWheel}>
            {/* Only render the header if it is specified. */}
            { props.header ? <ContainerHeader text={props.header!} inset={props.inset} /> : null }

            <div className={cn("bg-container border rounded-lg p-2 h-full", props.inner)}>
                {props.children}
            </div>
        </div>
    )
}

/**
 * The header for the container.
 */
const ContainerHeader = (props: { 
    /**
     * The header text.
     */
    text: string, 

    /**
     * If the header should be inset.
     */
    inset?: boolean
}) => {
    return <h1 className={cn(
        "text-sm font-bold text-secondary pl-4",

        // Decrease the padding if the header should be inset.
        { "pl-2": props.inset } 
    )}>
        {props.text}
    </h1>
}

export default Container
