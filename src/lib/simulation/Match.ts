import Base, { BaseColor } from "@/lib/simulation/Base"
import Pack from "@/lib/simulation/Pack"
import MatchData, { type MatchEvent } from "@/lib/statistics/data/MatchData"
import Timer from "@/lib/Timer"

export default class Match {
    public static readonly DURATION = 1000 * 60 * 15

    public static readonly KILL_REWARD = 100
    public static readonly DEATH_PENALTY = 50
    public static readonly BASE_REWARD = 1000

    public readonly teamSize
    public readonly basesEnabled
    public readonly data

    public readonly packs = new Array<Pack>()
    public readonly bases = new Array<Base>()

    public readonly timer = new Timer(Match.DURATION, 10)
    private _finished = false

    public constructor(packCount: number, teamSize: TeamSize, basesEnabled: boolean) {
        this.teamSize = teamSize
        this.basesEnabled = basesEnabled
        this.data = new MatchData(this)

        this.initializePacks(packCount)

        if (basesEnabled) {
            this.initializeBases()
        }

        this.timer.onFinish(() => {
            this._finished = true
        })

        this.timer.start()
    }

    public initializePacks(packCount: number) {
        let team = 0, teamIndex = 0

        for (let i = 0; i < packCount; i++) {
            this.packs.push(new Pack(this.packs.length, team, this))

            if (++teamIndex >= this.teamSize) {
                teamIndex = 0
                team++
            }
        }
    }

    public initializeBases() {
        for (const key of Object.keys(BaseColor)) {
            this.bases.push(new Base(BaseColor[key as keyof typeof BaseColor], this))
        }
    }

    public end() {
        this.timer.finish()
    }

    public get finished() {
        return this._finished
    }

    public saveEvent(packEvent: MatchEvent) {
        const score = this.packs
            .map(pack => pack.score)
            .reduce((a, b) => a + b)

        const event = {
            type: packEvent.type,
            time: packEvent.time,
            score: score
        }

        this.data.events.push(event)
    }
}

export enum TeamSize {
    SOLO = 1,
    DUO = 2,
    TRIO = 3,
    SQUAD = 4
}
