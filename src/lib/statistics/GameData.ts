import type Match from "@/lib/simulation/Match"

export default class GameData {
    public match = new MatchData()
    public packs = new PackData()

    public toJson() {
        return {

        }
    }

    public static fromJson() {
        const data = new GameData()
        const match = new MatchData()

        data.match = match
        return data
    }

    public download() {
        const data = encodeURIComponent(JSON.stringify(this.toJson()))
        const element = document.createElement("a")
        element.setAttribute("href", `data:text/json;charset=utf-8,${data}`)
        element.setAttribute("download", `lasertag-${Date.now()}.json`)
        element.click()
        element.remove()
    }
}

export class MatchData {
    public basesEnabled: boolean = true
    public events = new Array<MatchEvent>
}

export class PackData {

}

export enum EventType {
    KILL="kill",
    DEATH="death",
    BASE="base"
}

export type MatchEvent = {
    type: EventType,
    time: number,
    score: number
}