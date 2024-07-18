import Container from "@/components/Container"
import type Pack from "@/lib/simulation/Pack"
import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

const BasePack = (props: { pack: Pack, children?: ReactNode, buttons?: ReactNode, className?: string }) => {
    return (
        <Container key={props.pack.id} inner={cn("bg-element w-44 overflow-hidden text-center", props.className)}>
            <h1 className="text-primary text-xl font-semibold">{props.pack.name}</h1>
            <h1 className="text-secondary text-md">ID: {props.pack.id}</h1>
            {props.children}
            <ButtonContainer children={props.buttons} />
        </Container>
    )
}

const ButtonContainer = (props: { children?: ReactNode }) => {
    return (
        <div className="mt-2 flex gap-2">
            {props.children}
        </div>
    )
}

export const PackButton = (props: { text: string, onClick?: () => void, className?: string, disabled?: boolean }) => {
    return (
        <button
            className={cn("bg-container border rounded-md w-full h-10", props.className)}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <h1 className="text-primary font-semibold">{props.text}</h1>
        </button>
    )
}

export default BasePack