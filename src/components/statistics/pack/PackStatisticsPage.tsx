"use client"

import Leaderboard from "@/components/statistics/pack/leaderboard/Leaderboard"
import MetricSwitcher from "@/components/statistics/pack/leaderboard/MetricSwitcher"
import StandoutGrid from "@/components/statistics/pack/standouts/StandoutGrid"
import { Comparator } from "@/lib/statistics/calculation/general"
import { Metric, packMetrics, teamMetrics } from "@/lib/statistics/calculation/pack"

import type MatchData from "@/lib/statistics/data/MatchData"
import { useState } from "react"

const PackStatisticsPage = (props: { 
    /**
     * The match data to display.
     */
    data: MatchData
}) => {
    /**
     * The currently selected leaderboard metric.
     */
    const [metric, setMetric] = useState(Metric.SCORE)

    /**
     * The comparator, if the metric is deaths, the results should be descending.
     */
    const comparator = metric != Metric.DEATHS ? Comparator.ASCENDING : Comparator.DESCENDING

    return (
        <div className="flex gap-2 [&>*]:flex [&>*]:gap-2 [&>*]:flex-col">
            <div className="w-3/5">
                <StandoutGrid 
                    packs={props.data.packs}
                />
                <MetricSwitcher 
                    metric={metric}
                    setMetric={setMetric}
                />
            </div>
            <div className="w-2/5">
                <Leaderboard
                    label="SOLO LEADERBOARD"
                    entries={packMetrics(props.data.packs, metric)}
                    comparator={comparator}
                />
                <Leaderboard
                    label="TEAM LEADERBOARD"
                    entries={teamMetrics(props.data.packs, metric)}
                    comparator={comparator}
                />
            </div>
        </div>
    )
}

export default PackStatisticsPage
