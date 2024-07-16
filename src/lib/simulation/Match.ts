import Base, { BaseColor } from "@/lib/simulation/Base"
import Pack from "@/lib/simulation/Pack"
import GameData from "@/lib/statistics/GameData"
import Timer, { TimerEvent } from "@/lib/Timer"

export default class Match {
    public static readonly DURATION = 1000 * 60 * 15

    public static readonly KILL_REWARD = 1000
    public static readonly DEATH_PENALTY = 500
    public static readonly BASE_REWARD = 10000 

    public readonly teamSize
    public readonly basesEnabled
    public readonly packs = new Array<Pack>()
    public readonly bases = new Array<Base>()
    public readonly timer = new Timer(Match.DURATION, 10)
    public finished = false
    public data = new GameData()

    constructor(packs: number, teamSize: TeamSize, basesEnabled: boolean) {
        this.teamSize = teamSize
        this.basesEnabled = basesEnabled

        let team = 0, teamIndex = 0

        for (let i = 0; i < packs; i++) {
            this.packs.push(new Pack(this.packs.length, team))

            if (++teamIndex >= teamSize) {
                teamIndex = 0
                team++
            }
        }

        if (basesEnabled) {
            for (const key of Object.keys(BaseColor)) {
                this.bases.push(new Base(BaseColor[key as keyof typeof BaseColor]))
            }
        }

        this.timer.on(TimerEvent.FINISH, () => {
            this.finished = true
        })

        this.timer.start()
    }

    public end() {
        this.timer.finish()
    }
}

export enum TeamSize {
    SOLO=1,
    DUO=2,
    TRIO=3,
    SQUAD=4
}