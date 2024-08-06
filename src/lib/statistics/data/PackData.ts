import type Pack from "@/lib/simulation/Pack"
import type { MatchEvent } from "@/lib/statistics/data/MatchData"

/**
 * Holds pack information and events for statistics calculations.
 * 
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

export default class PackData {
    /**
     * A pack's name.
     */
    public name: string

    /**
     * A pack's score.
     */
    public score: number

    /**
     * The pack's team index.
     */
    public team: number

    /**
     * A list of events a pack was involved in.
     */
    public readonly events = new Array<MatchEvent>()

    /**
     * Creates pack data using data from an existing pack.
     * 
     * @param pack The pack to use for data.
     */
    public constructor(pack: Pack) {
        this.name = pack.name
        this.score = pack.score
        this.team = pack.team
    }
}
