import Container from "@/components/Container"
import type Pack from "@/lib/simulation/Pack"
import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const BasePack = (props: { 
    /**
     * The pack to display information for.
     */
    pack: Pack, 

    /**
     * Extra pack display content.
     */
    children?: ReactNode,

    /**
     * The buttons to display.
     */
    buttons?: ReactNode, 

    /**
     * The container className.
     */
    className?: string
}) => {
    return (
        <Container key={props.pack.id} inner={cn("bg-element w-44 overflow-hidden text-center", props.className)}>
            <h1 className="text-primary text-xl font-semibold">{props.pack.name}</h1>
            <h1 className="text-secondary text-md">ID: {props.pack.id}</h1>
            {props.children}
            <div className="mt-2 flex gap-2">
                {props.buttons}
            </div>
        </Container>
    )
}

export default BasePack
