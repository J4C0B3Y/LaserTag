import Container from "@/components/Container"
import MatchData from "@/lib/statistics/data/MatchData"

const Leaderboard = (props: { team?: boolean, match: MatchData }) => {
    const packs = props.match.packs

    return (
        <Container header={`${props.team ? "TEAM" : "SOLO"} LEADERBOARD`}>

        </Container>
    )
}

export default Leaderboard
