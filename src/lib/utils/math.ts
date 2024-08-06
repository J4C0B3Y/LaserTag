
/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * Calculates the average from a set of values.
 * 
 * @param values The set of values.
 * @returns The average.
 */
export const average = (values: Array<number>) => {
    // If no values were specified, return 0.
    if (values.length == 0) {
        return 0
    }

    let total = 0

    // Add each value to the total,
    for (const value of values) {
        total += value
    }

    // Then divide by the amount of values.
    return total / values.length
}

/**
 * Calculates the sum from a set of values.
 * 
 * @param values The set of values.
 * @returns The sum.
 */
export const sum = (values: Array<number>) => {
    let total = 0

    // Add each value to the total.
    for (const value of values) {
        total += value
    }

    return total
}

/**
 * Rounds a value to the specified amount of decimals.
 * 
 * @param value The value to round.
 * @param decimals The amount of decimals to round to.
 * @returns The rounded value.
 */
export const round = (value: number, decimals = 2) => {
    const factor = 10 ** decimals
    return Math.round(value * factor) / factor
}

/**
 * Calculates the ratio safely and rounds the result.
 * 
 * @param first The first value.
 * @param second The second value.
 * @returns The ratio.
 */
export const ratio = (first: number, second: number) => {
    // If the first number is zero, the ratio is zero.
    if (first == 0) {
        return 0
    }

    // Prevent a division by zero by returning the
    // first number if the second number is zero.
    if (second == 0) {
        return first
    }

    // Make sure rounding is more accurate.
    // https://stackoverflow.com/a/11832950
    return round(first / second + Number.EPSILON)
}

/**
 * Clamps a value between a min and a max.
 * 
 * @param value The value. 
 * @param min The min.
 * @param max The max.
 * @returns The clamped value
 */
export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max)
}
