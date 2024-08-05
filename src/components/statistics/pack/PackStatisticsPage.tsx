"use client"

import Leaderboard from "@/components/statistics/pack/leaderboard/Leaderboard"
import MetricSwitcher, { Metric, MetricResolver } from "@/components/statistics/pack/leaderboard/MetricSwitcher"
import Standouts from "@/components/statistics/pack/standouts/Standouts"
import { sort } from "@/lib/statistics/calculation/GeneralCalculations"
import { Comparator } from "@/lib/statistics/calculation/PackCalculations"
import type MatchData from "@/lib/statistics/data/MatchData"
import { useState } from "react"

const PackStatisticsPage = (props: { data: MatchData }) => {
    const [metric, setMetric] = useState(Metric.SCORE)
    const comparator = metric != Metric.DEATHS ? Comparator.ASCENDING : Comparator.DESCENDING

    return (
        <div className="flex gap-2 [&>*]:flex [&>*]:gap-2 [&>*]:flex-col">
            <div className="w-3/5">
                <Standouts match={props.data} />
                <MetricSwitcher 
                    metric={metric}
                    setMetric={setMetric}
                />
            </div>
            <div className="w-2/5">
                <Leaderboard
                    label="SOLO LEADERBOARD"
                    comparator={comparator}
                    entries={
                        props.data.packs.map(pack => ({
                            name: pack.name, 
                            value: MetricResolver[metric](pack)
                        }))
                    }
                />
                <Leaderboard
                    label="TEAM LEADERBOARD"
                    comparator={comparator}
                    entries={
                        sort(props.data.packs).map((team, index) => ({
                            name: `Team ${index + 1}`,
                            value: team.map(pack => MetricResolver[metric](pack)).reduce((a, b) => a + b)
                        }))
                    }
                />
            </div>
        </div>
    )
}

export default PackStatisticsPage
