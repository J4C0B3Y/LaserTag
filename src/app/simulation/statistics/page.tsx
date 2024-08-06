"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import PackStatisticsPage from "@/components/statistics/pack/PackStatisticsPage"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * See {@link PackStatisticsPage}.
 */
const Statistics = () => {
    return <PackStatisticsPage data={useMatch().match.data} />
}

export default Statistics
