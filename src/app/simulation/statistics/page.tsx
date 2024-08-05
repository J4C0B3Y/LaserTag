"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import PackStatisticsPage from "@/components/statistics/pack/PackStatisticsPage"

const Statistics = () => {
    const { match } = useMatch()
    
    return <PackStatisticsPage data={match.data} />
}

export default Statistics