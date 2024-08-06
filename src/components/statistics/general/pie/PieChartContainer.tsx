import Container from "@/components/Container"
import PieChart from "@/components/statistics/general/pie/PieChart"
import { amount } from "@/lib/statistics/calculation/general"
import type MatchData from "@/lib/statistics/data/MatchData"
import { EventType } from "@/lib/statistics/data/MatchData"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const PieChartContainer = (props: { 
    /**
     * The match data to display.
     */
    match: MatchData
 }) => {
    return (
        <Container header="&nbsp;" inner="flex flex-row pb-2 px-1 pt-0">
            <PieChart
                text="SCORE"
                packs={props.match.packs}
                resolver={pack => pack.score}
            />
            <PieChart
                text="KILLS"
                packs={props.match.packs}
                resolver={pack => amount(pack, EventType.KILL)}
            />
            <PieChart
                text="DEATHS"
                packs={props.match.packs}
                resolver={pack => amount(pack, EventType.DEATH)}
            />
            <PieChart
                text={`BASES ${!props.match.basesEnabled ? "(DISABLED)" : ""}`}
                packs={props.match.packs}
                resolver={pack => amount(pack, EventType.BASE)}
            />
        </Container>
    )
}



export default PieChartContainer
