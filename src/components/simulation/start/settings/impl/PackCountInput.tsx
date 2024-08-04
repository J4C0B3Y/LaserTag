"use client"

import { cn } from "@/lib/utils/cn"
import type { WheelEvent } from "react"

const PackCountInput = (props: { value: number, setValue: (value: number) => void }) => {
    const MIN = 2
    const MAX = 32

    const step = (value: number) => {
        props.setValue(clamp(props.value + value))
    }

    const clamp = (value: number) => {
        return Math.min(Math.max(value, MIN), MAX)
    }

    const handleWheel = (event: WheelEvent) => {
        step(event.deltaY < 0 ? 1 : -1)
    }

    return (
        <div className="border rounded-md flex bg-container gap-[2px]" onWheel={handleWheel}>
            <PackInputButton text="-" onClick={() => step(-1)} className="rounded-l-md" />
            <input
                className="text-center font-semibold bg-element text-primary"
                type="number"
                value={props.value || 0}
                min={MIN}
                max={MAX}
                onChange={event => props.setValue(clamp(event.target.valueAsNumber))}
            />
            <PackInputButton text="+" onClick={() => step(1)} className="rounded-r-md" />
        </div>
    )
}

const PackInputButton = (props: { text: string, onClick: () => void, className?: string }) => {
    return (
        <button
            className={cn("bg-element w-8 font-semibold text-primary", props.className)}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default PackCountInput