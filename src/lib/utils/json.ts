
/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * Safely parses a value into json unless
 * the value is invalid, then return null.
 * 
 * @param value The value to parse.
 * @returns The parsed value or null.
 */
export const parse = (value: any) => {
    // null and undefined is valid json, but we want
    // a json object, so we treat it as invalid.
    if (value == null || value == undefined) {
        return null
    }

    // Return the parsed json or null if the value was invalid.
    try {
        return JSON.parse(value)
    } catch {
        return null
    }
}

/**
 * Downloads an object as a json file.
 * 
 * @param object The object to download.
 * @param prefix The file prefix.
 */
export const download = (object: any, prefix: string) => {
    // Turn the object into a url-safe json string.
    const data = encodeURIComponent(JSON.stringify(object, null, "  "))

    // Create an instance of an anchor (link) element.
    const element = document.createElement("a")

    // Set the file content, specifying the encoding. 
    element.setAttribute("href", `data:text/json;charset=utf-8,${data}`)

    // Set the file name, which uses the prefix and 
    // current timestamp to make a unique file name.
    element.setAttribute("download", `${prefix}-${Date.now()}.json`)

    // Click the element, causing the download to commence.
    element.click()

    // Destroy the anchor element.
    element.remove()
}
