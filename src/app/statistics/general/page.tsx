"use client"

import { useGameData } from "@/components/provider/impl/GameDataProvider"

const GeneralStatisticsPage = () => {
    const { data } = useGameData()

    return <>{JSON.stringify(data)}</>
}

export default GeneralStatisticsPage