import MatchData, { type MatchEvent } from "@/lib/statistics/data/MatchData"
import Base, { BaseColor } from "@/lib/simulation/Base"
import Pack from "@/lib/simulation/Pack"
import Timer from "@/lib/Timer"
import { sum } from "@/lib/utils/math"

/**
 * Contains match-related logic and 
 * state for a laser tag simulation.
 * 
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */
export default class Match {
    /**
     * The duration the match goes for in milliseconds.
     */
    public static readonly DURATION = 1000 * 60 * 15

    /**
     * The score reward for getting a kill.
     */
    public static readonly KILL_REWARD = 100

    /**
     * The score penalty for getting killed.
     */
    public static readonly DEATH_PENALTY = 50

    /**
     * The score reward for shooting a base.
     */
    public static readonly BASE_REWARD = 1000

    /**
     * The match's team size.
     */
    public readonly teamSize: TeamSize

    /**
     * If the match has bases enabled.
     */
    public readonly basesEnabled: boolean

    /**
     * The match's data, this is used for statistics calculations.
     */
    public readonly data: MatchData

    /**
     * The packs contained within the match.
     */
    public readonly packs = new Array<Pack>()

    /**
     * The bases contained within the match,
     * this will be empty if bases are not enabled.
     */
    public readonly bases = new Array<Base>()

    /**
     * The match's timer.
     */
    public readonly timer = new Timer(Match.DURATION, 10)

    /**
     * If the match is finished.
     */
    private _finished = false

    /**
     * Creates a new match, initializing packs, bases and the timer.
     * 
     * @param packCount The match's pack count.
     * @param teamSize The match's team size.
     * @param basesEnabled If the match has bases enabled.
     */
    public constructor(packCount: number, teamSize: TeamSize, basesEnabled: boolean) {
        this.teamSize = teamSize
        this.basesEnabled = basesEnabled

        // Initialize Pack data.
        this.data = new MatchData(this)

        // Initialize packs, sorting them into teams.
        this.initializePacks(packCount)

        // Initialize bases, if bases are enabled.
        if (basesEnabled) {
            this.initializeBases()
        }

        // When there is no remaining time on the timer,
        this.timer.onFinish(() => {
            // Mark the match as finished.
            this._finished = true
        })

        // Start the timer.
        this.timer.start()
    }

    /**
     * Instantiates a specified amount of packs,
     * calculating their respective team indices.
     * 
     * @param packCount The amount of packs to create.
     */
    public initializePacks(packCount: number) {
        let team = 0, teamIndex = 0

        for (let i = 0; i < packCount; i++) {
            // Add the pack to the packs list.
            this.packs.push(new Pack(this.packs.length, team, this))

            // Increase the current team index, if it
            // is equal to the team size, reset the 
            // team index and increase the team number.
            if (++teamIndex >= this.teamSize) {
                teamIndex = 0
                team++
            }
        }
    }

    /**
     * Instantiates bases for each base color.
     */
    public initializeBases() {
        // For each base color, create a new 
        // base and add it to the bases list.
        for (const key of Object.keys(BaseColor)) {
            this.bases.push(new Base(BaseColor[key as keyof typeof BaseColor], this))
        }
    }

    /**
     * Force the timer to finish, which ends the match.
     */
    public forceEnd() {
        this.timer.finish()
    }

    /**
     * If the match is finished.
     */
    public get finished() {
        return this._finished
    }

    /**
     * Converts a pack event to a match 
     * event and saves it to the match data.
     * 
     * @param packEvent The pack event.
     */
    public saveEvent(packEvent: MatchEvent) {
        // Add up the total score across all packs.
        const score = sum(this.packs.map(pack => pack.score))

        // Create a new event with the modified score.
        const event = {
            type: packEvent.type,
            time: packEvent.time,
            score: score
        }

        // Add it to the match data events.
        this.data.events.push(event)
    }
}

/**
 * The possible match team sizes.
 */
export enum TeamSize {
    /**
     * A team size containing 1 pack.
     */
    SOLO = 1,

    /**
     * A team size containing 2 packs.
     */
    DUO = 2,

    /**
     * A team size containing 3 packs.
     */
    TRIO = 3,

    /**
     * A team size containing 4 packs.
     */
    SQUAD = 4
}
