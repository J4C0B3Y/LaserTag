import type { EventType } from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"

export const average = (values: Array<number>) => {
    if (values.length == 0) {
        return 0
    }

    return values.reduce((a, b) => a + b) / values.length
}

export const round = (value: number, decimals = 2) => {
    const factor = 10 ** decimals
    return Math.round(value * factor) / factor
}

export const filter = (pack: PackData, type: EventType) => {
    return pack.events.filter(event => event.type == type)
}

export const format = (milliseconds: number) => {
    return round(milliseconds / 1000, 1) + "s"
}

export const ratio = (a: number, b: number) => {
    if (a == 0) {
        return 0
    }

    if (b == 0) {
        return a
    }

    return round(a / b + Number.EPSILON)
}

export const time = (pack: PackData, type?: EventType) => {
    const events = type != undefined ? filter(pack, type) : pack.events
    const values = new Array<number>()

    for (let i = 0; i < events.length - 1; i++) {
        values.push(events[i + 1].time - events[i].time)
    }

    return average(values)
}

export const sort = (packs: Array<PackData>) => {
    const teams = new Map<number, Array<PackData>>()

    for (const pack of packs) {
        if (!teams.has(pack.team)) {
            teams.set(pack.team, new Array())
        }

        teams.get(pack.team)!.push(pack)
    }

    return Array.from(teams.values())
}

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

export const Filter = {
    ALL: (value: number) => true,
    NON_ZERO: (value: number) => value != 0
}

export const Comparator = {
    ASCENDING: (a: number, b: number) => b - a,
    DESCENDING: (a: number, b: number) => a - b
}