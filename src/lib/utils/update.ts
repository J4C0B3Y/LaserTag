import { useEffect, useReducer, useState } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * Auto re-renders a component at a set interval.
 * 
 * @param milliseconds The interval to re-render at.
 */
export const useAutoUpdate = (milliseconds: number) => {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        setTimeout(() => setToggle(!toggle), milliseconds)
    }, [toggle])
}

/**
 * Forces a component to re-render when the trigger is invoked.
 * 
 * @returns The trigger function.
 */
export const useUpdate = () => {
    const [, trigger] = useReducer(x => x + 1, 0)
    return trigger
}
