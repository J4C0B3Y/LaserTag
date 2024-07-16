
export default class GameData {
    
    public toJson() {
        return {

        }
    }

    public static fromJson() {
        const data = new GameData()

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