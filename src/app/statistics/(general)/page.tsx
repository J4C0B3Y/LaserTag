"use client"

import "chart.js/auto"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import TotalStatistics from "@/components/statistics/general/TotalStatistics"
import EventsGraph from "@/components/statistics/general/EventsGraph"
import Container from "@/components/Container"
import Button from "@/components/Button"
import { useState } from "react"
import { notify } from "@/components/provider/impl/NotificationProvider"
import PieCharts from "@/components/statistics/general/PieCharts"

const GeneralStatistics = () => {
    const DOWNLOAD_COOLDOWN = 1000 * 3

    const { data } = useMatchData()
    const [lastDownload, setLastDownload] = useState(0)

    const handleDownload = () => {
        const cooldown = lastDownload + DOWNLOAD_COOLDOWN - Date.now()

        if (cooldown > 0) {
            notify.error(`Please wait ${Math.ceil(cooldown / 1000)}s before downloading again!`)
            return
        }
        
        data.download()
        notify.success("Downloaded Game File!")
        setLastDownload(Date.now())
    }

    return <>
        <PieCharts match={data} />
        <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
                <TotalStatistics match={data} />
                <Container header="EXPORT">
                    <Button
                        text="Download Game File"
                        className="w-full"
                        onClick={handleDownload}
                    />
                </Container>
            </div>
            <EventsGraph match={data} />
        </div>
    </>
    
}

export default GeneralStatistics