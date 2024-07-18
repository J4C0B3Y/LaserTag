import type Pack from "@/lib/simulation/Pack"
import type { MatchEvent } from "@/lib/statistics/data/MatchData"

export default class PackData {
    public readonly id
    public readonly events
    public name

    constructor(pack: Pack) {
        this.id = pack.id
        this.name = pack.name
        this.events = new Array<MatchEvent>()
    }
}