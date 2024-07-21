import type Pack from "@/lib/simulation/Pack"
import type { MatchEvent } from "@/lib/statistics/data/MatchData"

export default class PackData {
    public name
    public score
    public readonly events

    constructor(pack: Pack) {
        this.name = pack.name
        this.score = pack.score
        this.events = new Array<MatchEvent>()
    }
}