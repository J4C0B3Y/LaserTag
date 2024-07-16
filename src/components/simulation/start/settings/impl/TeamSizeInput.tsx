import { TeamSize } from "@/lib/simulation/Match"
import type { WheelEvent } from "react"

const TeamSizeInput = (props: { value: TeamSize, setValue: (value: TeamSize) => void }) => {

    const toggle = (value: number) => {
        const keys = Object.keys(TeamSize).filter(key => isNaN(key as any))
        let index = keys.indexOf(TeamSize[props.value]) + value

        if (index < 0) {
            index = keys.length - 1
        } else if (index >= keys.length) {
            index = 0
        }

        props.setValue(TeamSize[keys[index] as keyof typeof TeamSize])
    }

    const handleWheel = (event: WheelEvent) => {
        toggle(event.deltaY < 0 ? 1 : -1)
    }

    return (
        <button
            className="border bg-element rounded-md font-semibold px-4 text-primary"
            onClick={() => toggle(1)}
            onWheel={handleWheel}
        >
            {TeamSize[props.value]}
        </button>
    )
}

export default TeamSizeInput