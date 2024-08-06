import Container from "@/components/Container"
import StatisticEntry from "@/components/statistics/general/total/StatisticEntry"
import { TeamSize } from "@/lib/simulation/Match"
import { amount } from "@/lib/statistics/calculation/general"
import { Metric, MetricResolver } from "@/lib/statistics/calculation/pack"
import type MatchData from "@/lib/statistics/data/MatchData"
import { EventType } from "@/lib/statistics/data/MatchData"
import { sum } from "@/lib/utils/math"

const TotalStatistics = (props: { 
    /**
     * The match data to display.
     */
    match: MatchData
 }) => {
    return (
        <Container header="TOTALS" inner="px-3" outer="w-full h-max">
            <StatisticEntry 
                text="Score" // The total match score.
                value={sum(props.match.packs.map(MetricResolver[Metric.SCORE]))}
            />
            <StatisticEntry 
                text="Kills" // The total match kills.
                value={amount(props.match, EventType.KILL)}
            />
            <StatisticEntry 
                text="Deaths" // The total match deaths.
                value={amount(props.match, EventType.DEATH)}
            />
            <StatisticEntry 
                text="Bases Shot" // The total match bases shot.
                value={amount(props.match, EventType.BASE)}
            />
            <StatisticEntry 
                text="Player Count" // The match player count.
                value={props.match.packs.length}
            />
            <StatisticEntry 
                text="Team Size" // The match team size.
                value={TeamSize[props.match.teamSize]}
            />
        </Container>
    )
}

export default TotalStatistics