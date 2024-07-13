import { TeamSize } from "@/lib/simulation/Match"

const TeamSizeInput = (props: { value: any, setValue: (value: TeamSize) => void }) => {

    const handleToggle = () => {
        const keys = Object.keys(TeamSize).filter(_ => isNaN(_ as any))
        const next = props.value + 1
        props.setValue(next > keys.length ? TeamSize[keys[0] as any] : next)
    }

    return (
        <button 
            className="border-2 border-stone-500 bg-stone-200 rounded font-semibold px-2"
            onClick={handleToggle}
        >
            {TeamSize[props.value]}
            <span className="pl-1 text-stone-500">▼</span>
        </button>
    )
}

export default TeamSizeInput