import Pack from "@/lib/simulation/Pack"
import type GameData from "@/lib/statistics/GameData"
import Timer, { TimerEvent } from "@/lib/Timer"

export default class Match {
    public static readonly DURATION = 1000 * 60 * 15

    public readonly teamSize
    public readonly bases
    public readonly packs = new Array<Pack>()
    public readonly timer = new Timer(Match.DURATION, 10)
    public finished = false
    public data: GameData = {}

    constructor(packs: number, teamSize: TeamSize, bases: boolean) {
        this.teamSize = teamSize
        this.bases = bases

        let team = 0, teamIndex = 0

        for (let i = 0; i < packs; i++) {
            this.packs.push(new Pack(this.packs.length, team))

            if (++teamIndex >= teamSize) {
                teamIndex = 0
                team++
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