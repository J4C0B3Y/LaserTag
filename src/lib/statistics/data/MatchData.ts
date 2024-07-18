import Match from "@/lib/simulation/Match"
import PackData from "@/lib/statistics/data/PackData"

export default class MatchData {
    public readonly basesEnabled
    public readonly teamSize
    public readonly packs

    constructor(match: Match | null) {
        this.basesEnabled = match?.basesEnabled
        this.teamSize = match?.teamSize
        this.packs = new Array<PackData>()
    }

    public static from(object: any) {
        return Object.assign(new MatchData(null), object)
    }

    public download() {
        const data = encodeURIComponent(JSON.stringify(this))
        const element = document.createElement("a")
        element.setAttribute("href", `data:text/json;charset=utf-8,${data}`)
        element.setAttribute("download", `lasertag-${Date.now()}.json`)
        element.click()
        element.remove()
    }
}

export enum EventType {
    KILL="kill",
    DEATH="death",
    BASE="base"
}

export type MatchEvent = {
    type: EventType,
    time: number,
    score: number
}