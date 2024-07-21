import InputContainer from "@/components/simulation/pack/config/input/InputContainer"
import type Pack from "@/lib/simulation/Pack"
import { cn } from "@/lib/utils/cn"
import { useState } from "react"

const NumberInput = (props: { header: string, pack: Pack }) => {
    const [value, setValue] = useState(props.pack[props.key as keyof ])

    return (
        <InputContainer header={props.header}>
            <div className="flex border rounded-md gap-[2px]">
                <input 
                    type="number"
                    className="bg-element p-2 text-2xl text-primary rounded-[4px] rounded-r-none w-full"
                    style={{ MozAppearance: "textfield" }}
                />
                <div className="flex flex-col gap-[2px]">
                    <NumberInputButton text="+" className="rounded-tr-[4px]" />
                    <NumberInputButton text="-" className="rounded-br-[4px]" />
                </div>
            </div>
        </InputContainer>
    )
}

const NumberInputButton = (props: { text: string, className?: string }) => {
    return (
        <button
            className={cn(
                "bg-element w-8 text-primary text-md",
                props.className
            )}
        >
            {props.text}
        </button>
    )
}

export default NumberInput