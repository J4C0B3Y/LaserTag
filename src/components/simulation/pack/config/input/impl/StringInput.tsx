"use client"

import ConfigInput from "@/components/simulation/pack/config/input/ConfigInput"
import { useEffect, useState } from "react"

const StringInput = (props: { 
    header: string
    value: string,
    setValue: (value: string) => void,
    min: number,
    max: number
}) => {
    const [value, setValue] = useState(props.value)
    const [valid, setValid] = useState(true)

    useEffect(() => {
        if (value.trim().length < props.min || value.length > props.max) {
            setValid(false)
            return
        }

        setValid(true)
        props.setValue(value)
    }, [value])

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <ConfigInput 
            header={props.header}
            value={value}
            onChange={event => setValue(event.target.value)}
            type="text"
            valid={valid}
        />
    )
}

export default StringInput