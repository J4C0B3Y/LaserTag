"use client"

import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import Leaderboard from "@/components/statistics/pack/Leaderboard"
import Standouts from "@/components/statistics/pack/Standouts"

const PlayerStatistics = () => {
    const { data } = useMatchData()

    return (
        <div className="flex gap-2">
            <div className="w-[1200px]">
                <Standouts match={data} />
            </div>
            <div className="flex flex-col w-full gap-2">
                <Leaderboard match={data} />
                <Leaderboard match={data} team />
            </div>
        </div>
    )
}

export default PlayerStatistics
