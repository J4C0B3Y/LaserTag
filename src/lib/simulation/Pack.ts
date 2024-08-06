import Match from "@/lib/simulation/Match"
import PackData from "@/lib/statistics/data/PackData"
import type Base from "@/lib/simulation/Base"
import { EventType } from "@/lib/statistics/data/MatchData"
import { parse } from "@/lib/utils/json"
import { ratio } from "@/lib/utils/math"

/**
 * Contains pack-related logic and 
 * state for a laser tag simulation.
 * 
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */
export default class Pack {
    /**
     * The respawn cooldown in milliseconds.
     */
    public static readonly COOLDOWN = 1000 * 3

    /**
     * The default score multiplier.
     */
    public static readonly DEFAULT_MULTIPLIER = 1

    /**
     * The default score adjustment.
     */
    public static readonly DEFAULT_ADJUSTMENT = 0

    /**
     * The pack's id, which is also the pack's index.
     */
    public readonly id: number

    /**
     * The pack's team index.
     */
    public readonly team: number

    /**
     * The match that the pack belongs to.
     */
    public readonly match: Match

    /**
     * The pack's data, this is used for statistics calculations.
     */
    public readonly data: PackData

    /**
     * The pack's name.
     */
    private _name: string = null as any

    /**
     * The pack's kill count.
     */
    private _kills = 0

    /**
     * The pack's death count.
     */
    private _deaths = 0

    /**
     * The pack's shot base count.
     */
    private _bases = 0

    /**
     * The pack's raw score, this is the value before the
     * score multiplier and adjustments are calculated.
     */
    private _rawScore = 0

    /**
     * The pack's score multiplier.
     */
    private _scoreMultiplier = Pack.DEFAULT_MULTIPLIER

    /**
     * The pack's score adjustment.
     */
    private _scoreAdjustment = Pack.DEFAULT_ADJUSTMENT

    /**
     * The timer-relative timestamp that the pack was last shot.
     */
    private _lastShot = -Pack.COOLDOWN

    /**
     * Creates a new pack, loading its config and generating pack data.
     * 
     * @param id The pack id / index.
     * @param team The pack team index.
     * @param match The match that the pack belongs too.
     */
    public constructor(id: number, team: number, match: Match) {
        this.id = id
        this.team = team
        this.match = match

        // Load saved pack configuration.
        this.load()

        // Initialize pack data.
        this.data = new PackData(this)

        // Add the pack data to the match data.
        this.match.data.packs.push(this.data)
    }

    /**
     * Loads pack configuration if present,
     * else fallback to default values.
     */
    private load() {
        const saved = parse(window.localStorage.getItem(`pack-${this.id}`))

        // If there is a saved value, load it.
        if (saved != null) {
            this._name = saved.name
            this._scoreMultiplier = saved.multiplier || Pack.DEFAULT_MULTIPLIER
            this._scoreAdjustment = saved.adjustment || Pack.DEFAULT_ADJUSTMENT
        }

        // If the pack doesn't have a name, generate one.
        if (this._name == null) {
            this._name = `Pack ${this.id + 1}`
        }
    }

    /**
     * Saves pack configuration.
     */
    public save() {
        window.localStorage.setItem(`pack-${this.id}`, JSON.stringify({
            name: this._name,
            multiplier: this._scoreMultiplier,
            adjustment: this._scoreAdjustment
        }))
    }

    /**
     * Shoots a pack, updates statistics.
     * 
     * @param target The pack to shoot.
     */
    public shoot(target: Pack) {
        // Throw an error if the target pack was shot whilst on cooldown,
        // this should never be true, but is here as a backup to catch bugs.
        if (target.disabled) {
            throw new Error(`Pack ${target.id} was shot by pack #${this.id} whilst on cooldown for ${target.cooldown}ms.`)
        }

        // Set the target's last shot to the current elapsed timer timestamp.
        target._lastShot = this.match.timer.elapsed

        // Adds a death to the target.
        target.addDeath()

        // Adds a kill to the current pack.
        this.addKill()
    }

    /**
     * Modifies the raw score, preventing the result from 
     * going below 0, also sets the pack data's score.
     * 
     * @param score The amount to change the raw score by.
     */
    private modify(score: number) {
        this._rawScore = Math.max(this._rawScore + score, 0)
        this.data.score = this.score
    }

    /**
     * The packs score, with the multiplier and adjustment calculations.
     */
    public get score() {
        return Math.max(Math.round(
            this._rawScore * this._scoreMultiplier + this._scoreAdjustment
        ), 0)
    }

    /**
     * Adds a kill to the pack, modifying the score and saving an event.
     */
    public addKill() {
        this._kills += 1
        this.modify(Match.KILL_REWARD)
        this.saveEvent(EventType.KILL)
    }

    /**
     * Adds a death to the pack, modifying the score and saving an event.
     */
    public addDeath() {
        this._deaths += 1
        this.modify(-Match.DEATH_PENALTY)
        this.saveEvent(EventType.DEATH)
    }

    /**
     * Shoots a base, modifying the score and saving an event.
     * 
     * @param base 
     */
    public shootBase(base: Base) {
        // Throw an error if the base was shot whilst on cooldown,
        // this should never be true, but is here as a backup to catch bugs.
        if (base.disabled) {
            throw new Error(`Base (${base.color}) was shot by pack #${this.id} whilst on cooldown for ${base.cooldown}ms.`)
        }

        // Shoots the base, putting it on cooldown.
        base.shoot()

        this._bases += 1
        this.modify(Match.BASE_REWARD)
        this.saveEvent(EventType.BASE)
    }

    /**
     * Saves an event to the pack and match data.
     * 
     * @param type The event type.
     */
    private saveEvent(type: EventType) {
        const event = {
            type: type,
            time: this.match.timer.elapsed,
            score: this.score
        }

        this.data.events.push(event)
        this.match.saveEvent(event)
    }

    /**
     * The pack's name.
     */
    public get name() {
        return this._name as string
    }

    /**
     * Set's the pack's name, updating the pack's
     * data, and saving its configuration.
     */
    public set name(name: string) {
        this._name = name
        this.data.name = name
        this.save()
    }

    /**
     * The pack's kill count.
     */
    public get kills() {
        return this._kills
    }

    /**
     * The pack's death count.
     */
    public get deaths() {
        return this._deaths
    }

    /**
     * The pack's shot base count.
     */
    public get bases() {
        return this._bases
    }

    /**
     * The timer-relative timestamp that the pack was last shot.
     */
    public get lastShot() {
        return this._lastShot
    }

    /**
     * The pack's respawn cooldown.
     */
    public get cooldown() {
        return Math.max(this._lastShot + Pack.COOLDOWN - this.match.timer.elapsed, 0)
    }

    /**
     * If the pack is disabled, meaning it is on cooldown.
     */
    public get disabled() {
        return this.cooldown > 0
    }

    /**
     * The pack's score multiplier.
     */
    public get scoreMultiplier() {
        return this._scoreMultiplier
    }

    /**
     * Set's the pack's score multiplier, updating
     * the pack's data, and saving its configuration.
     */
    public set scoreMultiplier(multiplier: number) {
        this._scoreMultiplier = multiplier
        this.data.score = this.score
        this.save()
    }

    /**
     * The pack's score adjustment.
     */
    public get scoreAdjustment() {
        return this._scoreAdjustment
    }

    /**
     * Set's the pack's score adjustment, updating
     * the pack's data, and saving its configuration.
     */
    public set scoreAdjustment(adjustment: number) {
        this._scoreAdjustment = adjustment
        this.data.score = this.score
        this.save()
    }

    /**
     * The pack's kill to death ratio.
     */
    public get kdr() {
        return ratio(this._kills, this._deaths)
    }

    /**
     * Resets the pack's kills, deaths, bases, and score.
     */
    public resetStats() {
        this._kills = 0
        this._deaths = 0
        this._bases = 0
        this._rawScore = 0
    }

    /**
     * Reset's the pack's name, score multiplier and adjustment,
     * updating the packs data to reflect the changes. 
     */
    public resetConfig() {
        // Delete the pack config.
        window.localStorage.removeItem(`pack-${this.id}`)

        // Reset name, multiplier and adjustment.
        this._name = null as any
        this._scoreMultiplier = Pack.DEFAULT_MULTIPLIER
        this._scoreAdjustment = Pack.DEFAULT_ADJUSTMENT

        // Load the pack, generating a new name.
        this.load()

        // Update the data and configuration.
        this.data.name = this.name
        this.name = this._name
    }
}
