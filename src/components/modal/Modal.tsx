import Container from "@/components/Container"
import { type ReactNode } from "react"

const Modal = (props: { title: string, subtitle: string, children?: ReactNode, open: boolean }) => {
    return props.open && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-page bg-opacity-50 flex items-center justify-center">
            <Container inner="w-[600px] flex flex-col px-0 items-center gap-2">
                <h1 className="text-primary font-semibold text-2xl pt-6">{props.title}</h1>
                <h1 className="text-secondary pb-7">{props.subtitle}</h1>
                <span className="w-full border-[1px]" />
                <div className="flex w-full px-2 justify-end gap-2">
                    {props.children}
                </div>
            </Container>
        </div>
    )
}

export default Modal