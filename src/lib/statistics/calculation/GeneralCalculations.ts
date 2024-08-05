import { EventType } from "../data/MatchData"
import PackData from "../data/PackData"

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

export const multi = (pack: PackData, type: EventType) => {
    let current = 0
    let highest = 0

    for (const event of pack.events) {
        current = event.type == type ? current + 1 : 0
        highest = current > highest ? current : highest
    }

    return highest
}

export const scores = (packs: Array<PackData>) => {
    return sort(packs).map((team, index) => ({
        name: `Team ${index + 1}`,
        score: team.map(pack => pack.score).reduce((a, b) => a + b)
    }))
}

export const Filter = {
    ALL: (value: number) => true,
    NON_ZERO: (value: number) => value != 0
}
