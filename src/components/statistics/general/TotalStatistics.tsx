import Container from "@/components/Container"
import { TeamSize } from "@/lib/simulation/Match"
import type MatchData from "@/lib/statistics/data/MatchData"
import { EventType } from "@/lib/statistics/data/MatchData"

const TotalStatistics = (props: { match: MatchData }) => {
    return (
        <Container header="TOTALS" inner="px-3" outer="w-full h-max">
            <StatisticEntry 
                text="Score"
                value={props.match.packs.map(pack => pack.score).reduce((x, y) => x + y)}
            />
            <StatisticEntry 
                text="Kills"
                value={props.match.events.filter(event => event.type == EventType.KILL).length}
            />
            <StatisticEntry 
                text="Deaths"
                value={props.match.events.filter(event => event.type == EventType.DEATH).length}
            />
            <StatisticEntry 
                text="Bases Shot"
                value={props.match.events.filter(event => event.type == EventType.BASE).length}
            />
            <StatisticEntry 
                text="Player Count"
                value={props.match.packs.length}
            />
            <StatisticEntry 
                text="Team Size"
                value={TeamSize[props.match.teamSize]}
            />
        </Container>
    )
}

const StatisticEntry = (props: { text: string, value: string | number }) => {
    return (
        <div className="flex justify-between">
            <h1 className="text-primary text-lg">{props.text}:</h1>
            <h1 className="text-primary text-lg">{props.value}</h1>
        </div>
    )
}

export default TotalStatistics