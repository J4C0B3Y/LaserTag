import Container from "@/components/Container"

const LeaderboardEntry = (props: { 
    /**
     * The position of the entry in the leaderboard.
     */
    position: number,

    /**
     * The pack or team name to display in the entry.
     */
    name: string,

    /**
     * The value associated with the entry.
     */
    value: number
}) => {
    return (
        <Container inner="flex gap-2 bg-element text-lg font-semibold">
            <h1 className="text-secondary">#{props.position}</h1>
            <h1 className="text-primary">{props.name}</h1>
            <h1 className="text-primary ml-auto">{props.value}</h1>
        </Container>
    )
}

export default LeaderboardEntry
