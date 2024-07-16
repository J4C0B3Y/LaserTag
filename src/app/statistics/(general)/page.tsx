"use client"

import { useGameData } from "@/components/provider/impl/GameDataProvider"

const GeneralStatistics = () => {
    const { data } = useGameData()

    return <>{JSON.stringify(data)}</>
}

export default GeneralStatistics