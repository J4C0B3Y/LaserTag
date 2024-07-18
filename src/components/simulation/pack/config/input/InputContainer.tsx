import type { ReactNode } from "react"

const InputContainer = (props: { header: string, children: ReactNode }) => {
    return (
        <div className="flex flex-col">
            <h1 className="text-secondary pl-2 font-bold text-sm">{props.header}</h1>
            {props.children}
        </div>
    )
}

export default InputContainer