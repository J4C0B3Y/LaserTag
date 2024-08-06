import Match, { TeamSize } from "@/lib/simulation/Match"
import PackData from "@/lib/statistics/data/PackData"
import { download } from "@/lib/utils/json"

export default class MatchData {
    public readonly teamSize
    public readonly basesEnabled
    public readonly packs
    public readonly events

    public constructor(match: Match | null) {
        this.teamSize = match?.teamSize || TeamSize.DUO
        this.basesEnabled = match?.basesEnabled || true
        this.packs = new Array<PackData>()
        this.events = new Array<MatchEvent>()
    }

    public static from(object: any) {
        return Object.assign(new MatchData(null), object)
    }

    public download() {
        download(this, "lasertag")
    }
}

export enum EventType {
    KILL = "KILL",
    DEATH = "DEATH",
    BASE = "BASE"
}

export type MatchEvent = {
    type: EventType,
    time: number,
    score: number
}
