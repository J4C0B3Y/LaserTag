import type Match from "@/lib/simulation/Match"

export default class Base {
    public static readonly COOLDOWN = 1000 * 10

    public readonly color
    public readonly match

    private _lastShot = -Base.COOLDOWN

    public constructor(color: BaseColor, match: Match) {
        this.color = color
        this.match = match
    }

    public shoot() {
        this._lastShot = this.match.timer.elapsed
    }

    public get lastShot() {
        return this._lastShot
    }

    public get cooldown() {
        return Math.max(this._lastShot + Base.COOLDOWN - this.match.timer.elapsed, 0)
    }

    public get disabled() {
        return this.cooldown > 0
    }
}

export enum BaseColor {
    RED = "Red",
    BLUE = "Blue",
    GREEN = "Green",
    YELLOW = "Yellow",
}
