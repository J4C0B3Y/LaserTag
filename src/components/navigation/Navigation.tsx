import Container from "@/components/Container"
import ButtonContainer from "@/components/navigation/ButtonContainer"
import type { ReactNode } from "react"

const Navigation = (props: {
    /**
     * The buttons to put on the left of the navigation.
     */
    left?: ReactNode, 

    /**
     * The content to put in the center of the navigation.
     */
    center?: ReactNode, 

    /**
     * The buttons to put on the right of the navigation.
     */
    right?: ReactNode 
}) => {
    return (
        <Container inner="flex items-center">
            <ButtonContainer children={props.left} />
            {props.center}
            <ButtonContainer children={props.right} className="justify-end" />
        </Container>
    )
}



export default Navigation