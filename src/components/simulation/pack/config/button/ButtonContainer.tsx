import Container from "@/components/Container"
import type { ReactNode } from "react"

const ButtonContainer = (props: { children?: ReactNode }) => {
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