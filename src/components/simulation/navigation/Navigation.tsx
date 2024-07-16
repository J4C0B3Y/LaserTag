import Container from "@/components/Container"
import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

const Navigation = (props: { left?: ReactNode, center?: ReactNode, right?: ReactNode }) => {
    return (
        <Container inner="flex items-center">
            <ButtonContainer children={props.left} />
            {props.center}
            <ButtonContainer children={props.right} className="justify-end" />
        </Container>
    )
}

const ButtonContainer = (props: { children?: ReactNode, className?: string }) => {
    return (
        <div className={cn("flex flex-1 gap-2", props.className)}>
            {props.children}
        </div>
    )
}

export default Navigation