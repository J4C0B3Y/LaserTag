import { useEffect, useReducer, useState } from "react"

export const autoupdate = (ms: number) => {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        setTimeout(() => setToggle(!toggle), ms)
    }, [toggle])
}

export const useUpdate = () => {
    const [, trigger] = useReducer(x => x + 1, 0)
    return trigger
}
