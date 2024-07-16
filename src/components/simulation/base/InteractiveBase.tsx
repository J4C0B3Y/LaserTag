import Container from "@/components/Container"
import type Base from "@/lib/simulation/Base"
import { BaseColor } from "@/lib/simulation/Base"
import { cn } from "@/lib/utils/cn"

const InteractiveBase = (props: { base: Base }) => {

    return (
        <Container
            inner={cn("", BaseBackground[props.base.color])}
            outer="w-full" 
        >   
            <h1>{props.base.color}</h1>
        </Container>
    )
}

const BaseBackground = {
    [BaseColor.RED]: "bg-base-red",
    [BaseColor.BLUE]: "bg-base-blue",
    [BaseColor.GREEN]: "bg-base-green",
    [BaseColor.YELLOW]: "bg-base-yellow"
}

export default InteractiveBase