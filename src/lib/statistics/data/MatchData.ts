import Match from "@/lib/simulation/Match"
import PackData from "@/lib/statistics/data/PackData"
import Json from "@/lib/utils/Json"

export default class MatchData {
    public readonly basesEnabled
    public readonly teamSize
    public readonly packs
    public readonly events

    constructor(match: Match | null) {
        this.basesEnabled = match?.basesEnabled
        this.teamSize = match?.teamSize
        this.packs = new Array<PackData>()
        this.events = new Array<MatchEvent>()
    }

    public static from(object: any) {
        return Object.assign(new MatchData(null), object)
    }

    public download() {
        Json.download(this, "lasertag")
    }
}

export enum EventType {
    KILL="KILL",
    DEATH="DEATH",
    BASE="BASE"
}

export type MatchEvent = {
    type: EventType,
    time: number,
    score: number
}