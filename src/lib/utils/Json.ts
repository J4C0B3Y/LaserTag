
export default class Json {
    public static safeParse = (input: string | null | undefined) => {
        if (input == null || input == undefined) return null
    
        try {
            return JSON.parse(input)
        } catch {
            return null
        }
    }
}