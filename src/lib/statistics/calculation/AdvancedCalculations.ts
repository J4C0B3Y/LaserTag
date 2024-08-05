import type PackData from "@/lib/statistics/data/PackData"
import { average, Filter, round, sort } from "./GeneralCalculations"

export const pack = (
    packs: Array<PackData>,
    value: (pack: PackData) => number,
    filter: (value: number) => boolean
) => {
    return round(average(packs.map(value).filter(filter)))
}

export const team = (
    packs: Array<PackData>,
    value: (pack: PackData) => number,
    filter: (value: number) => boolean,
    comparator: (a: number, b: number) => number
) => {
    const teams = sort(packs)
    const values = new Array<number>()

    for (const team of teams) {
        values.push(pack(team, value, filter))
    }

    return values.filter(filter).sort(comparator)[0] || 0
}

export const calculate = (
    packs: Array<PackData>,
    value: (pack: PackData) => number,
    filter = Filter.ALL,
    comparator = Comparator.ASCENDING
) => {
    return [
        pack(packs, value, filter),
        team(packs, value, filter, comparator)
    ]
}

export const Comparator = {
    ASCENDING: (a: number, b: number) => b - a,
    DESCENDING: (a: number, b: number) => a - b
}
