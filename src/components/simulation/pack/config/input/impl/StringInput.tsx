"use client"

import ConfigInput from "@/components/simulation/pack/config/input/ConfigInput"
import { useEffect, useState } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const StringInput = (props: { 
    /**
     * The input header.
     */
    header: string

    /**
     * The input value.
     */
    value: string,

    /**
     * The function to set the input value.
     * 
     * @param value The input value.
     */
    setValue: (value: string) => void,

    /**
     * The min input value.
     */
    min: number,

    /**
     * The max input value.
     */
    max: number
}) => {
    /**
     * The input value.
     */
    const [value, setValue] = useState(props.value)

    /**
     * If the input is valid
     */
    const [valid, setValid] = useState(true)

    /**
     * Set the value if it is valid.
     */
    useEffect(() => {
        if (value.trim().length < props.min || value.length > props.max) {
            setValid(false)
            return
        }

        setValid(true)
        props.setValue(value)
    }, [value])

    /**
     * Update the value if it is changed through props.
     */
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
