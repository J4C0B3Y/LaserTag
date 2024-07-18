"use client"

import InputContainer from "@/components/simulation/pack/config/input/InputContainer"
import type Pack from "@/lib/simulation/Pack"
import { cn } from "@/lib/utils/cn"
import { useEffect, useState } from "react"

const NameInput = (props: { pack: Pack, update: () => void }) => {
    const [name, setName] = useState(props.pack.name)
    const [valid, setValid] = useState(true)

    useEffect(() => {
        if (name.length < 1 || name.length > 11 || name.trim().length < 1) {
            setValid(false)
            return
        }

        setValid(true)
        props.pack.name = name
        props.update()
    }, [name])

    return (
        <InputContainer header="DISPLAY NAME">
            <input
                type="text"
                className={cn(
                    "border bg-element rounded-md p-2 text-2xl text-primary transition-colors",
                    { "bg-validation": !valid }
                )}
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
        </InputContainer>
    )
}

export default NameInput