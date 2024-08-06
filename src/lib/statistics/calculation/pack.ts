import { amount, Comparator, Filter, teams } from "@/lib/statistics/calculation/general"
import { EventType } from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"
import { sum } from "@/lib/utils/math"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * Finds the pack whos non-filtered resolved value
 * sorted using the comparator is first.
 * 
 * If no pack is found then the first pack in the
 * packs list is used with a value of 0.
 * 
 * @param packs The list of packs. 
 * @param resolver The value resolver.
 * @param comparator The comparator.
 * @param filter The value filter.
 * @returns 
 */
export const calculate = (
    packs: Array<PackData>,
    resolver: (pack: PackData) => number,
    comparator = Comparator.ASCENDING,
    filter = Filter.ALL,
) => {
    return packs
        .map(pack => ({ pack, value: resolver(pack) }))
        .filter(pack => filter(pack.value))
        .sort((first, second) => comparator(first.value, second.value))
        .at(0) || { pack: packs[0], value: 0 }
}

/**
 * Maps each pack to a leaderboard-displayable
 * object using the respective metric resolver.
 * 
 * @param packs The list of packs.
 * @param metric The metric.
 * @returns The displayable object.
 */
export const packMetrics = (packs: Array<PackData>, metric: Metric) => {
    return packs.map(pack => ({
        name: pack.name,
        value: MetricResolver[metric](pack)
    }))
}

/**
 * Maps each team to a leaderboard-displayable object
 * using the sum of their respective metric resolver.
 * 
 * @param packs The list of packs.
 * @param metric The metric.
 * @returns The displayable object.
 */
export const teamMetrics = (packs: Array<PackData>, metric: Metric) => {
    return teams(packs).map((team, index) => ({
        name: `Team ${index + 1}`,

        // The sum of the result of the metric 
        // resolver for each pack in the team.
        value: sum(team.map(pack => MetricResolver[metric](pack)))
    }))
}

/**
 * Possible metrics that can be displayed on the leaderboard.
 */
export enum Metric {
    SCORE = "SCORE",
    KILLS = "KILLS",
    DEATHS = "DEATHS",
    BASES = "BASES"
}

/**
 * Used to map a metric to its resolver.
 */
export const MetricResolver = {
    [Metric.SCORE]: (pack: PackData) => pack.score,
    [Metric.KILLS]: (pack: PackData) => amount(pack, EventType.KILL),
    [Metric.DEATHS]: (pack: PackData) => amount(pack, EventType.DEATH),
    [Metric.BASES]: (pack: PackData) => amount(pack, EventType.BASE)
}