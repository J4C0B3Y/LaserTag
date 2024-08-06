
export const parse = (input: any) => {
    if (input == null || input == undefined) {
        return null
    }

    try {
        return JSON.parse(input)
    } catch {
        return null
    }
}

export const download = (object: any, id: string) => {
    const data = encodeURIComponent(JSON.stringify(object, null, "  "))
    const element = document.createElement("a")

    element.setAttribute("href", `data:text/json;charset=utf-8,${data}`)
    element.setAttribute("download", `${id}-${Date.now()}.json`)

    element.click()
    element.remove()
}
