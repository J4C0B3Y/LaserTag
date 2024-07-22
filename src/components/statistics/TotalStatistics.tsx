import Container from "@/components/Container"
import type MatchData from "@/lib/statistics/data/MatchData"

const TotalStatistics = (props: { match: MatchData }) => {
    return (
        <Container header="TOTALS">
            <StatisticEntry 
                text="Score"
                value={props.match.packs.map(pack => pack.score).reduce((x, y) => x + y).toString()}
            />
        </Container>
    )
}

const StatisticEntry = (props: { text: string, value: string }) => {
    return (
        <div className="flex justify-between">
            <h1 className="text-primary text-lg">{props.text}:</h1>
            <h1 className="text-primary text-lg">{props.value}</h1>
        </div>
    )
}

export default TotalStatistics