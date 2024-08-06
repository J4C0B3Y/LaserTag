import { round } from "./math"

export const format = (milliseconds: number) => {
    return round(milliseconds / 1000, 1) + "s"
}
