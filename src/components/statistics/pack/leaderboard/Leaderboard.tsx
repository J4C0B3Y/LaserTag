
import Container from "@/components/Container"
import LeaderboardEntry from "@/components/statistics/pack/leaderboard/LeaderboardEntry"

const Leaderboard = (props: { 
    /**
     * The label to display above the leaderboard.
     */
    label: string,

    /**
     * The leaderboard entries.
     */
    entries: Array<{ name: string, value: number }>,

    /**
     * The comparator, which is how the leaderboard is sorted.
     * 
     * @param first The first value.
     * @param second The second value.
     * @returns See {@link Array.sort}
     */
    comparator: (first: number, second: number) => number
}) => {
    return (
        <Container 
            header={props.label}
            inner="flex flex-col gap-2 overflow-y-scroll"
            outer="h-[19.5rem]" // h-78
        >
            {props.entries
                // Sort the entries using the comparator.
                .sort((first, second) => props.comparator(first.value, second.value))
                // Display the resulting leaderboard entries. 
                .map((entry, index) => 
                    <LeaderboardEntry
                        key={index}
                        position={index + 1} 
                        name={entry.name} 
                        value={entry.value} 
                    />
                )
            }
        </Container>
    )
}

export default Leaderboard
