import Pack from "@/lib/simulation/Pack"

export default class Match {
    public readonly size
    public readonly bases
    public readonly packs = new Array<Pack>()

    constructor(packs: number, size: TeamSize, bases: boolean) {
        this.size = size
        this.bases = bases

        let teamIndex = 0

        for (let i = 0; i < packs; i++) {
            if (teamIndex >= size) {
                teamIndex = 0
            }

            this.packs.push(new Pack(this.packs.length, teamIndex++))
        }
    }
    
}

export enum TeamSize {
    SOLO=1,
    DUO=2,
    TRIO=3,
    SQUAD=4
}