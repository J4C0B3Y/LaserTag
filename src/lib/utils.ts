import type { ClassValue } from "clsx"
import clsx from "clsx"
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