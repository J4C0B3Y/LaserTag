import type Base from "@/lib/simulation/Base"
import Match from "@/lib/simulation/Match"

export default class Pack {
    public readonly id
    public readonly team
    private _name
    public kills = 0
    public deaths = 0
    public bases = 0
    public multiplier = 1
    public adjust = 0
    private _score = 0
    
    constructor(id: number, team: number) {
        this.id = id
        this.team = team
        this._name = this.loadName()
    }

    public get name() {
        return this._name
    }

    public set name(name: string) {
        this._name = name
        window.localStorage.setItem(`pack-${this.id}`, name)
    }

    public loadName() {
        const local = window.localStorage.getItem(`pack-${this.id}`)

        if (local != null) {
            return local
        }

        if (this.id < names.length) {
            return names[this.id]
        }

        return `Pack #${this.id + 1}`
    }
    
    public get kdr(){
        if (this.kills == 0) return 0
        if (this.deaths == 0) return this.kills

        const ratio = this.kills / this.deaths

        return Math.round((ratio + Number.EPSILON) * 100) / 100
    }

    public get score() {
        const score = 
            (this.kills * 1000) +
            (this.bases * 10000) -
            (this.deaths * 500) *
            (this.multiplier) +
            (this.adjust)

        return Math.max(score, 0)
    }

    public shoot(target: Pack) {
        this.kills++
        target.deaths++
    }
}

class Pack2 {
    public readonly id
    public readonly team

    private _kills = 0
    private _deaths = 0
    private _bases = 0

    private _rawScore = 0
    public scoreMultiplier = 1
    public scoreAdjustment = 0

    constructor(id: number, team: number) {
        this.id = id
        this.team = team
    }

    public shoot(target: Pack) {

    }

    private modify(score: number) {
        this._rawScore = Math.max(this._rawScore + score, 0)
    }

    public get score() {
        return Math.max(this._rawScore * this.scoreMultiplier + this.scoreAdjustment, 0)
    }

    public get kills() {
        return this._kills
    }

    public addKill() {
        this._kills += 1
        this.modify(Match.KILL_REWARD)
    }

    public addDeath() {
        this._deaths += 1
        this.modify(-Match.DEATH_PENALTY)
    }

    public shootBase(base: Base) {
        if (base.disabled) {
            throw new Error(`Base (${base.color}) was shot by pack #${this.id} whilst on cooldown for ${base.cooldown}ms.`)
        }

        base.shoot()
        this._bases += 1
        this.modify(Match.BASE_REWARD)
    }

    public get deaths() {
        return this._deaths
    }

    public get bases() {
        return this._bases
    }
}

const names = [
    "Brimstone", "Viper", "Sage", "Phoenix",
    "Jett", "Sova", "Raze", "Reyna", "Cypher",
    "Breach", "Killjoy", "Chamber", "Skye", "Neon",
    "Astra", "Yoru", "Harbor", "Fade", "Deadlock",
    "Gekko",  "Iso", "KAY/O", "Omen", "Clove"
]