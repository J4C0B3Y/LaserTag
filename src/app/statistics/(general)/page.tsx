"use client"

import "chart.js/auto"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import TotalStatistics from "@/components/statistics/general/total/TotalStatistics"
import EventsGraph from "@/components/statistics/general/events/EventsGraph"
import Container from "@/components/Container"
import Button from "@/components/Button"
import { notify } from "@/components/provider/impl/NotificationProvider"
import PieCharts from "@/components/statistics/general/pie/PieChartContainer"
import { useCooldown } from "@/lib/utils/cooldown"

const GeneralStatistics = () => {
    /**
     * The match data.
     */
    const { data } = useMatchData()

    /**
     * Called when the download button is clicked.
     */
    const download = useCooldown("downloading", 1000 * 3, () => {
        data.download()
        notify.success("Downloaded Game File!")
    })

    return <>
        <PieCharts match={data} />
        <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
                <TotalStatistics match={data} />
                <Container header="EXPORT">
                    <Button
                        text="Download Game File"
                        className="w-full"
                        onClick={download}
                    />
                </Container>
            </div>
            <EventsGraph match={data} />
        </div>
    </>
    
}

export default GeneralStatistics