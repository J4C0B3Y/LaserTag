
export default class Base {
    public static readonly COOLDOWN = 1000 * 10

    public readonly color
    private _lastShot = 0

    constructor (color: BaseColor) {
        this.color = color
    }

    public shoot() {
        this._lastShot = Date.now()
    }

    public get lastShot() {
        return this._lastShot
    }

    public get cooldown() {
        return Math.max(this.lastShot + Base.COOLDOWN - Date.now(), 0)
    }

    public get disabled() {
        return this.cooldown > 0
    }
}

export enum BaseColor {
    RED="Red",
    BLUE="Blue",
    GREEN="Green",
    YELLOW="Yellow",
}