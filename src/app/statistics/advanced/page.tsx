"use client"

import Container from "@/components/Container"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import StatisticsHeader from "@/components/statistics/advanced/StatisticsHeader"
import StatisticsRow from "@/components/statistics/advanced/StatisticsRow"
import { calculate } from "@/lib/statistics/calculation/advanced"
import { amount, Comparator, Filter, between } from "@/lib/statistics/calculation/general"
import { EventType } from "@/lib/statistics/data/MatchData"
import { ratio } from "@/lib/utils/math"

const AdvancedStatistics = () => {
    /**
     * The match data.
     */
    const { data } = useMatchData()

    /**
     * The packs in the match data.
     */
    const packs = data.packs

    return (
        <div className="flex gap-4 [&>*]:flex-1">
            <Container header="AVERAGES" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="Score"
                    values={calculate(
                        // The average score.
                        packs, pack => pack.score
                    )}
                />
                <StatisticsRow
                    statistic="Kills"
                    values={calculate(
                        // The average amount of kills.
                        packs, pack => amount(pack, EventType.KILL)
                    )}
                />
                <StatisticsRow
                    statistic="Deaths"
                    values={calculate(
                        // The average amount of deaths.
                        packs, pack => amount(pack, EventType.DEATH),
                        Comparator.DESCENDING
                    )}
                />
                <StatisticsRow
                    statistic="Bases"
                    values={calculate(
                        // The average amount of bases shot.
                        packs, pack => amount(pack, EventType.BASE)
                    )}
                />
                <StatisticsRow
                    statistic="KDR"
                    values={calculate(
                        // The ratio of kills to deaths.
                        packs, pack => ratio(amount(pack, EventType.KILL), amount(pack, EventType.DEATH))
                    )}
                />
            </Container>
            <Container header="&nbsp;" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="Activity"
                    values={calculate(
                        // The average time per event.
                        packs, pack => between(pack),
                        Comparator.DESCENDING, Filter.NON_ZERO
                    )}
                    format
                />
                <StatisticsRow
                    statistic="TPK"
                    values={calculate(
                        // The average time per kill.
                        packs, pack => between(pack, EventType.KILL),
                        Comparator.DESCENDING, Filter.NON_ZERO
                    )}
                    format
                />
                <StatisticsRow
                    statistic="TPD"
                    values={calculate(
                        // The average time per death.
                        packs, pack => between(pack, EventType.DEATH),
                        Comparator.DESCENDING, Filter.NON_ZERO
                    )}
                    format
                />
                <StatisticsRow
                    statistic="TPB"
                    values={calculate(
                        // The average time per base shot.
                        packs, pack => between(pack, EventType.BASE),
                        Comparator.DESCENDING, Filter.NON_ZERO
                    )}
                    format
                />
                <StatisticsRow
                    statistic="TPKDR"
                    values={calculate(
                        // The ratio of the time per kill to the time per death.
                        packs, pack => ratio(between(pack, EventType.KILL) / 1000, between(pack, EventType.DEATH) / 1000),
                        Comparator.DESCENDING, Filter.NON_ZERO
                    )}
                />
            </Container>
        </div>
    )
}


export default AdvancedStatistics
