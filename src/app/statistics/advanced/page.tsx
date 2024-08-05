"use client"

import Container from "@/components/Container"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { calculate, Comparator } from "@/lib/statistics/calculation/AdvancedCalculations"
import { Filter, filter, format, ratio, time } from "@/lib/statistics/calculation/GeneralCalculations"
import { EventType } from "@/lib/statistics/data/MatchData"

const AdvancedStatistics = () => {
    const { data } = useMatchData()
    const packs = data.packs

    return (
        <div className="flex gap-4 [&>*]:flex-1">
            <Container header="AVERAGES" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="Score"
                    values={calculate(
                        packs, pack => pack.score
                    )}
                />
                <StatisticsRow
                    statistic="Kills"
                    values={calculate(
                        packs, pack => filter(pack, EventType.KILL).length
                    )}
                />
                <StatisticsRow
                    statistic="Deaths"
                    values={calculate(
                        packs, pack => filter(pack, EventType.DEATH).length,
                        Filter.ALL, Comparator.DESCENDING
                    )}
                />
                <StatisticsRow
                    statistic="Bases"
                    values={calculate(
                        packs, pack => filter(pack, EventType.BASE).length
                    )}
                />
                <StatisticsRow
                    statistic="KDR"
                    values={calculate(
                        packs, pack => ratio(filter(pack, EventType.KILL).length, filter(pack, EventType.DEATH).length)
                    )}
                />
            </Container>
            <Container header="&nbsp;" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="Activity"
                    values={calculate(
                        packs, pack => time(pack),
                        Filter.NON_ZERO,
                        Comparator.DESCENDING
                    )}
                    format
                />
                <StatisticsRow
                    statistic="TPK"
                    values={calculate(
                        packs, pack => time(pack, EventType.KILL),
                        Filter.NON_ZERO, Comparator.DESCENDING
                    )}
                    format
                />
                <StatisticsRow
                    statistic="TPD"
                    values={calculate(
                        packs, pack => time(pack, EventType.DEATH),
                        Filter.NON_ZERO, Comparator.DESCENDING
                    )}
                    format
                />
                <StatisticsRow
                    statistic="TPB"
                    values={calculate(
                        packs, pack => time(pack, EventType.BASE),
                        Filter.NON_ZERO, Comparator.DESCENDING
                    )}
                    format
                />
                <StatisticsRow
                    statistic="TPKDR"
                    values={calculate(
                        packs, pack => ratio(time(pack, EventType.KILL) / 1000, time(pack, EventType.DEATH) / 1000),
                        Filter.NON_ZERO, Comparator.DESCENDING
                    )}
                />
            </Container>
        </div>
    )
}

const StatisticsHeader = () => {
    return (
        <div className="flex text-secondary text-sm font-semibold [&>*]:flex-1 text-center">
            <h1>STATISTIC</h1>
            <h1>PLAYER</h1>
            <h1>TOP TEAM</h1>
        </div>
    )
}

const StatisticsRow = (props: { statistic: string, values: Array<number>, format?: boolean }) => {
    return (
        <div className="flex gap-2">
            <StatisticsEntry value={props.statistic} />
            <StatisticsEntry value={props.format ? format(props.values[0]) : props.values[0]} />
            <StatisticsEntry value={props.format ? format(props.values[1]) : props.values[1]} />
        </div>
    )
}

const StatisticsEntry = (props: { value: string | number }) => {
    return (
        <div className="bg-element flex-1 rounded-md border-seperator border">
            <h1 className="text-primary text-center text-2xl py-4">{props.value}</h1>
        </div>
    )
}

export default AdvancedStatistics
