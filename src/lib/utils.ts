import type { ClassValue } from "clsx"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const safeParse = (input: string | null | undefined) => {
    if (input == null || input == undefined) return null

    try {
        return JSON.parse(input)
    } catch {
        return null
    }
}

export const autoupdate = (ms: number) => {
    const [ticks, setTicks] = useState(0)

    useEffect(() => {
        setTimeout(() => setTicks(ticks + 1), ms)
    }, [ticks])
}