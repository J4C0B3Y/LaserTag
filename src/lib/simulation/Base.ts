import type Match from "@/lib/simulation/Match"

/**
 * Contains base-related logic and 
 * state for a laser tag simulation.
 * 
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */
export default class Base {
    /**
     * The activation cooldown in milliseconds.
     */
    public static readonly COOLDOWN = 1000 * 10

    /**
     * The base's color.
     */
    public readonly color: BaseColor

    /**
     * The match that the base belongs to.
     */
    public readonly match: Match

    /**
     * The timer-relative timestamp that the base was last shot.
     */
    private _lastShot = -Base.COOLDOWN

    /**
     * Creates a new base, specifying a color.
     * 
     * @param color The base's color.
     * @param match The match that the base belongs to.
     */
    public constructor(color: BaseColor, match: Match) {
        this.color = color
        this.match = match
    }

    /**
     * Marks the base as shot, setting last shot
     * to the current elapsed timer timestamp.
     */
    public shoot() {
        this._lastShot = this.match.timer.elapsed
    }

    /**
     * The timer-relative timestamp that the base was last shot.
     */
    public get lastShot() {
        return this._lastShot
    }

    /**
     * The base's activation cooldown.
     */
    public get cooldown() {
        return Math.max(this._lastShot + Base.COOLDOWN - this.match.timer.elapsed, 0)
    }

    /**
     * If the base is disabled, meaning it is on cooldown.
     */
    public get disabled() {
        return this.cooldown > 0
    }
}

/**
 * The possible base colors, and the display name.
 */
export enum BaseColor {
    /**
     * The red base.
     */
    RED = "Red",

    /**
     * The blue base.
     */
    BLUE = "Blue",

    /**
     * The green base.
     */
    GREEN = "Green",

    /**
     * The yellow base.
     */
    YELLOW = "Yellow"
}
