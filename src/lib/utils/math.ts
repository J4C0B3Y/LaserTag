
export const average = (values: Array<number>) => {
    if (values.length == 0) {
        return 0
    }

    return values.reduce((a, b) => a + b) / values.length
}

export const round = (value: number, decimals = 2) => {
    const factor = 10 ** decimals
    return Math.round(value * factor) / factor
}
