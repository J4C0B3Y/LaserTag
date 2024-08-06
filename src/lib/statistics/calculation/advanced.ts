import { Comparator, Filter, teams } from "@/lib/statistics/calculation/general"
import type PackData from "@/lib/statistics/data/PackData"
import { average, round } from "@/lib/utils/math"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * See {@link calculatePack} and {@link calculateTeam}.
 * 
 * @param packs The packs list.
 * @param resolver The value resolver.
 * @param comparator The comparator.
 * @param filter The value filter.
 * @returns The pack and top team average values.
 */
export const calculate = (
    packs: Array<PackData>,
    resolver: (pack: PackData) => number,
    comparator = Comparator.ASCENDING,
    filter = Filter.ALL
) => ({
    pack: calculatePack(packs, resolver, filter),
    team: calculateTeam(packs, resolver, comparator, filter)
})

/**
 * Calculates the average between all non-filtered
 * resolved values for a pack, and rounds the result.
 * 
 * @param packs The packs list.
 * @param resolver The value resolver.
 * @param filter The value filter.
 * @returns The average value.
 */
export const calculatePack = (
    packs: Array<PackData>,
    resolver: (pack: PackData) => number,
    filter: (value: number) => boolean
) => {
    return round(average(packs.map(resolver).filter(filter)))
}

/**
 * Finds the average non-filtered resolved value between
 * packs each team, sorts each teams average using the
 * comparator, then returns the average of the top team.
 * 
 * @param packs The packs list.
 * @param resolver The value resolver.
 * @param comparator The comparator.
 * @param filter The value filter.
 * @returns The averave value of the top team.
 */
export const calculateTeam = (
    packs: Array<PackData>,
    resolver: (pack: PackData) => number,
    comparator: (first: number, second: number) => number,
    filter: (value: number) => boolean
) => {
    const values = new Array<number>()

    for (const team of teams(packs)) {
        // Add the average of the team to the values list.
        values.push(calculatePack(team, resolver, filter))
    }

    // Filter the values, sort them using the comparator then
    // return the top teams average, being the first result.
    return values.filter(filter).sort(comparator)[0]
}