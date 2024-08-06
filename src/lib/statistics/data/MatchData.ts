import Match, { TeamSize } from "@/lib/simulation/Match"
import PackData from "@/lib/statistics/data/PackData"
import { download } from "@/lib/utils/json"

/**
 * Holds match information and events for statistics calculations.
 * 
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

export default class MatchData {
    /**
     * A match's team size.
     */
    public readonly teamSize: TeamSize

    /**
     * If a match has bases enabled.
     */
    public readonly basesEnabled: boolean

    /**
     * The packs in a match.
     */
    public readonly packs = new Array<PackData>()

    /**
     * The list of events emitted in a match.
     */
    public readonly events = new Array<MatchEvent>()

    /**
     * Creates pack match using data from an existing match,
     * If the match is null, fallback to default values.
     * 
     * @param match The match to use for data.
     */
    public constructor(match: Match | null) {
        this.teamSize = match?.teamSize || TeamSize.DUO
        this.basesEnabled = match?.basesEnabled || true
    }

    /**
     * Creates match data using values from an existing object.
     * 
     * @param object The object.
     * @returns The match data.
     */
    public static from(object: any) {
        // Creates new match data, then overwrites
        // its values with the object's values.
        return Object.assign(new MatchData(null), object)
    }

    /**
     * Downloads the match data.
     */
    public download() {
        download(this, "lasertag")
    }
}

/**
 * The possible match event types.
 */
export enum EventType {
    /**
     * A pack killing another pack.
     */
    KILL = "KILL",

    /**
     * A pack dying from another pack.
     */
    DEATH = "DEATH",

    /**
     * A pack shooting a base.
     */
    BASE = "BASE"
}

/**
 * Contains information about an event that occured during a match.
 */
export type MatchEvent = {
    /**
     * The event's type.
     */
    type: EventType,

    /**
     * The event's timestamp.
     */
    time: number,

    /**
     * The current score from the pack / match.
     */
    score: number
}
