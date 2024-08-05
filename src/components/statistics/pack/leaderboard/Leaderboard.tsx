
import Container from "@/components/Container"
import LeaderboardEntry from "@/components/statistics/pack/leaderboard/LeaderboardEntry"
import { Comparator } from "@/lib/statistics/calculation/PackCalculations"

const Leaderboard = (props: { 
    label: string,
    entries: Array<{ name: string, value: number }>,
    comparator: (a: { value: number }, b: { value: number }) => number
}) => {
    return (
        <Container 
            header={props.label}
            inner="flex flex-col gap-2 overflow-y-scroll"
            outer="h-[19.5rem]" // h-78
        >
            {props.entries.sort(props.comparator).map((entry, index) => 
                <LeaderboardEntry
                    key={index}
                    position={index + 1} 
                    name={entry.name} 
                    value={entry.value} 
                />
            )}
        </Container>
    )
}

export default Leaderboard
