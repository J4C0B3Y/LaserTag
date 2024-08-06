"use client"

import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import PackStatisticsPage from "@/components/statistics/pack/PackStatisticsPage"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * See {@link PackStatisticsPage}.
 */
const PackStatistics = () => {
    const { data } = useMatchData()
    return <PackStatisticsPage data={data} />
}

export default PackStatistics
