"use client"

import "chart.js/auto"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import TotalStatistics from "@/components/statistics/TotalStatistics"
import { Doughnut, Line } from "react-chartjs-2"
import EventsGraph from "@/components/statistics/EventsGraph"

const GeneralStatistics = () => {
    const { data } = useMatchData()

    return <>
        <TotalStatistics match={data} />
        <EventsGraph match={data} />
    </>
    
}

export default GeneralStatistics