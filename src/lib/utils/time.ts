import { round } from "@/lib/utils/math"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * Converts milliseconds into seconds,
 * rounds it to 1 decimal an adds an
 * 's' to the end.
 * 
 * @param milliseconds The milliseconds.
 * @returns The formatted time string.
 */
export const format = (milliseconds: number) => {
    return round(milliseconds / 1000, 1) + "s"
}
