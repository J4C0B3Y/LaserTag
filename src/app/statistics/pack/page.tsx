"use client"

import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import PackStatisticsPage from "@/components/statistics/pack/PackStatisticsPage"

const PackStatistics = () => {
    const { data } = useMatchData()

    return <PackStatisticsPage data={data} />
}

export default PackStatistics
