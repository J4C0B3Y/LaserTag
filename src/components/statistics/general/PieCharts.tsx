import Container from "@/components/Container"
import { filter } from "@/lib/statistics/Statistics"
import type MatchData from "@/lib/statistics/data/MatchData"
import { EventType } from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"
import { Pie } from "react-chartjs-2"

const PieCharts = (props: { match: MatchData }) => {
    return (
        <Container header="&nbsp;" inner="flex flex-row pb-2 px-1 pt-0">
            <PieChart
                text="SCORE"
                match={props.match}
                value={pack => pack.score}
            />

            <PieChart
                text="KILLS"
                match={props.match}
                value={pack => filter(pack, EventType.KILL).length}
            />

            <PieChart
                text="DEATHS"
                match={props.match}
                value={pack => filter(pack, EventType.DEATH).length}
            />

            <PieChart
                text={`BASES ${!props.match.basesEnabled ? "(DISABLED)" : ""}`}
                match={props.match}
                value={pack => filter(pack, EventType.BASE).length}
            />
        </Container>
    )
}

const PieChart = (props: { text: string, match: MatchData, value: (pack: PackData) => number }) => {
    return (
        <div className="flex-1 flex flex-col">
            <h1 className="absolute -z-10 -translate-y-[22px] translate-x-3 text-secondary font-bold text-sm">{props.text}</h1>
            <Pie
                className="w-full"
                data={{
                    datasets: [{
                        data: props.match.packs.map(pack => ({
                            name: pack.name,
                            value: props.value(pack)
                        }))
                    }]
                }}
            />
        </div>
    )
}

export default PieCharts