import Container from "@/components/Container"

const LeaderboardEntry = (props: { position: number, name: string, value: number }) => {
    return (
        <Container inner="flex gap-2 bg-element text-lg font-semibold">
            <h1 className="text-secondary">#{props.position}</h1>
            <h1 className="text-primary">{props.name}</h1>
            <h1 className="text-primary ml-auto">{props.value}</h1>
        </Container>
    )
}

export default LeaderboardEntry