"use client"

import { useMatchData } from "@/components/provider/impl/MatchDataProvider"

const GeneralStatistics = () => {
    const { data } = useMatchData()

    return <>{JSON.stringify(data)}</>
}

export default GeneralStatistics