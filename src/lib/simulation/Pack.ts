
export default class Pack {
    public readonly id
    public readonly team
    private _name
    public kills = 0
    public deaths = 0
    
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
        return this.kills / this.deaths || 0
    }

    public get score() {
        return 0
    }
}

const names = [
    "Brimstone", "Viper", "Sage", "Phoenix",
    "Jett", "Sova", "Raze", "Reyna", "Cypher",
    "Breach", "Killjoy", "Chamber", "Skye", "Neon",
    "Astra", "Yoru", "Harbor", "Fade", "Deadlock",
    "Gekko",  "Iso", "KAY/O", "Omen", "Clove"
]