import { TeamSize } from "@/lib/simulation/Match"
import type { WheelEvent } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const TeamSizeInput = (props: { 
    /**
     * The current team size.
     */
    teamSize: TeamSize, 

    /**
     * The function to set the team size.
     * 
     * @param teamSize The team size.
     */
    setTeamSize: (teamSize: TeamSize) => void
 }) => {

    /**
     * Toggles between the team sizes, wrapping to the
     * opposite side if the team size is at the start or end.
     * 
     * @param value The value to step by.
     */
    const step = (value: number) => {
        // A list of the team size names.
        const keys = Object.keys(TeamSize).filter(key => isNaN(key as any))

        // The current index plus the value.
        let index = keys.indexOf(TeamSize[props.teamSize]) + value

        // Wrap the value if it reaches a boundary.
        if (index < 0) {
            index = keys.length - 1
        } else if (index >= keys.length) {
            index = 0
        }

        // Set the new team size.
        props.setTeamSize(TeamSize[keys[index] as keyof typeof TeamSize])
    }

    /**
     * Steps the value when the button is scrolled.
     * 
     * @param event The wheel event.
     */
    const handleWheel = (event: WheelEvent) => {
        // If the scroll deltaY is less then zero,
        // step by one else step by negative one.
        step(event.deltaY < 0 ? 1 : -1)
    }

    return (
        <button
            className="border bg-element rounded-md font-semibold px-4 text-primary"
            onClick={() => step(1)}
            onWheel={handleWheel}
        >
            {TeamSize[props.teamSize]}
        </button>
    )
}

export default TeamSizeInput
