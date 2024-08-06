import Container from "@/components/Container"
import type { ReactNode } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const ButtonContainer = (props: { 
    /**
     * The buttons to display.
     */
    children?: ReactNode
}) => {
    return (
        <Container
            header="CONTROLS"
            inner="bg-element rounded-md grid grid-rows-3 grid-flow-col gap-2 auto-cols-fr"
            outer="h-full"
            inset
        >
            {props.children}
        </Container>
    )
}

export default ButtonContainer
