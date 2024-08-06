"use client"

import PackCountInputButton from "@/components/simulation/start/settings/impl/pack-count/PackCountInputButton"
import { clamp } from "@/lib/utils/math"
import type { WheelEvent } from "react"

const PackCountInput = (props: { 
    packCount: number, 
    setPackCount: (packCount: number) => void 
}) => {
    /**
     * The minium pack count value.
     */
    const MIN = 2

    /**
     * The maximum pack count value.
     */
    const MAX = 32

    /**
     * Steps the pack count by the specified value,
     * clamping the result between MIN and MAX.
     * 
     * @param value The value.
     */
    const step = (value: number) => {
        props.setPackCount(clamp(props.packCount + value, MIN, MAX))
    }

    /**
     * Steps the value when the div is scrolled.
     * 
     * @param event The wheel event.
     */
    const handleWheel = (event: WheelEvent) => {
        // If the scroll deltaY is less then zero,
        // step by one else step by negative one.
        step(event.deltaY < 0 ? 1 : -1)
    }

    return (
        <div className="border rounded-md flex bg-container gap-[2px]" onWheel={handleWheel}>
            <PackCountInputButton text="-" onClick={() => step(-1)} className="rounded-l-md" />
            <input
                className="text-center font-semibold bg-element text-primary"
                type="number"
                value={props.packCount || 0}
                min={MIN}
                max={MAX}
                onChange={event => props.setPackCount(clamp(event.target.valueAsNumber, MIN, MAX))}
            />
            <PackCountInputButton text="+" onClick={() => step(1)} className="rounded-r-md" />
        </div>
    )
}

export default PackCountInput
