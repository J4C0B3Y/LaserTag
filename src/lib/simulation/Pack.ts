import type Base from "@/lib/simulation/Base"
import Match from "@/lib/simulation/Match"
import { EventType } from "@/lib/statistics/data/MatchData"
import PackData from "@/lib/statistics/data/PackData"
import Json from "@/lib/utils/Json"

export default class Pack {
    public static readonly COOLDOWN = 1000 * 3

    public static readonly DEFAULT_MULTIPLIER = 1
    public static readonly DEFAULT_ADJUSTMENT = 0

    public readonly id
    public readonly team
    public readonly match
    public readonly data

    private _name: string = null as any

    private _kills = 0
    private _deaths = 0
    private _bases = 0

    private _rawScore = 0
    private _scoreMultiplier = Pack.DEFAULT_MULTIPLIER
    private _scoreAdjustment = Pack.DEFAULT_ADJUSTMENT

    private _lastShot = -Pack.COOLDOWN

    constructor(id: number, team: number, match: Match) {
        this.id = id
        this.team = team
        this.match = match
        this.load()

        this.data = new PackData(this)
        this.match.data.packs.push(this.data)
    }

    private load() {
        const saved = Json.safeParse(window.localStorage.getItem(`pack-${this.id}`))

        if (saved != null) {
            this._name = saved.name
            this._scoreMultiplier = saved.multiplier || 1
            this._scoreAdjustment = saved.adjustment || 0
        }

        if (this._name == null) {
           this._name = `Pack #${this.id + 1}`
        }
    }

    public save() {
        window.localStorage.setItem(`pack-${this.id}`, JSON.stringify({
            name: this._name,
            multiplier: this._scoreMultiplier,
            adjustment: this._scoreAdjustment
        }))
    }

    public shoot(target: Pack) {
        if (target.disabled) {
            throw new Error(`Pack #${target.id} was shot by pack #${this.id} whilst on cooldown for ${target.cooldown}ms.`)
        }

        target._lastShot = this.match.timer.elapsed
        target.addDeath()
        this.addKill()
    }

    private modify(score: number) {
        this._rawScore = Math.max(this._rawScore + score, 0)
        this.data.score = this.score
    }

    public get score() {
        return Math.max(Math.round(
            this._rawScore * this._scoreMultiplier + this._scoreAdjustment
        ), 0)
    }

    public get kills() {
        return this._kills
    }

    public addKill() {
        this._kills += 1
        this.modify(Match.KILL_REWARD)
        this.saveEvent(EventType.KILL)
    }

    public addDeath() {
        this._deaths += 1
        this.modify(-Match.DEATH_PENALTY)
        this.saveEvent(EventType.DEATH)
    }

    public shootBase(base: Base) {
        if (base.disabled) {
            throw new Error(`Base (${base.color}) was shot by pack #${this.id} whilst on cooldown for ${base.cooldown}ms.`)
        }

        base.shoot()
        this._bases += 1
        this.modify(Match.BASE_REWARD)
        this.saveEvent(EventType.BASE)
    }

    private saveEvent(type: EventType) {
        const event = {
            type: type,
            time: this.match.timer.elapsed,
            score: this.score
        }

        this.data.events.push(event)
    }

    public get deaths() {
        return this._deaths
    }

    public get bases() {
        return this._bases
    }

    public get lastShot() {
        return this._lastShot
    }

    public get cooldown() {
        return Math.max(this._lastShot + Pack.COOLDOWN - this.match.timer.elapsed, 0)
    }

    public get disabled() {
        return this.cooldown > 0
    }

    public get name() {
        return this._name as string
    }

    public set name(name: string) {
        this._name = name
        this.data.name = name
        this.save()
    }

    public get scoreMultiplier() {
        return this._scoreMultiplier
    }

    public set scoreMultiplier(multiplier: number) {
        this._scoreMultiplier = multiplier
        this.data.score = this.score
        this.save()
    }

    public get scoreAdjustment() {
        return this._scoreAdjustment
    }

    public set scoreAdjustment(adjustment: number) {
        this._scoreAdjustment = adjustment
        this.data.score = this.score
        this.save()
    }

    public get kdr() {
        if (this._kills == 0) {
            return 0
        }

        if (this._deaths == 0) {
            return this._kills
        }

        const ratio = this._kills / this._deaths

        return Math.round((ratio + Number.EPSILON) * 100) / 100
    }

    public resetStats() {
        this._kills = 0
        this._deaths = 0
        this._bases = 0
        this._rawScore = 0
    }

    public resetConfig() {
        window.localStorage.removeItem(`pack-${this.id}`)
        
        this._name = null as any
        this._scoreMultiplier = Pack.DEFAULT_MULTIPLIER
        this._scoreAdjustment = Pack.DEFAULT_ADJUSTMENT

        this.load()

        this.data.name = this.name
        this.name = this._name
    }
}