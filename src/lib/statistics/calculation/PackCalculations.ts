import PackData from "@/lib/statistics/data/PackData"
import { Filter } from "./GeneralCalculations"

export const calculate = (
    packs: Array<PackData>,
    value: (pack: PackData) => number,
    filter = Filter.ALL,
    comparator = Comparator.ASCENDING
) => {
    return packs
        .map(pack => ({ pack, value: value(pack) }))
        .filter(pack => filter(pack.value))
        .sort(comparator)[0]
}

export const Comparator = {
    ASCENDING: (a: { value: number }, b: { value: number }) => b.value - a.value,
    DESCENDING: (a: { value: number }, b: { value: number }) => a.value - b.value
}
