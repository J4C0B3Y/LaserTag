"use client"

import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import TotalStatistics from "@/components/statistics/TotalStatistics"

const GeneralStatistics = () => {
    const { data } = useMatchData()

    return (
        <TotalStatistics match={data} />
    )
}

export default GeneralStatistics