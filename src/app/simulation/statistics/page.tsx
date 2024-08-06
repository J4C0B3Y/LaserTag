"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import PackStatisticsPage from "@/components/statistics/pack/PackStatisticsPage"

const Statistics = () => {
    return <PackStatisticsPage data={useMatch().match.data} />
}

export default Statistics
