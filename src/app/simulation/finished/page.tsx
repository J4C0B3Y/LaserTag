"use client"

import Container from "@/components/Container"
import { useGameData } from "@/components/provider/impl/GameDataProvider"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import { notify } from "@/components/provider/impl/NotificationProvider"
import SimulationInfo from "@/components/simulation/info/SimulationInfo"
import NavigationButton from "@/components/simulation/navigation/NavigationButton"
import { useRouter } from "next-nprogress-bar"
import { useState } from "react"

const Finished = () => {
    const DOWNLOAD_COOLDOWN = 1000 * 3

    const { match } = useMatch()
    const { setData } = useGameData()
    const router = useRouter()

    const [lastDownload, setLastDownload] = useState(0)

    const handleDownload = () => {
        const cooldown = lastDownload + DOWNLOAD_COOLDOWN - Date.now()

        if (cooldown > 0) {
            notify.error(`Please wait ${Math.ceil(cooldown / 1000)}s before downloading again!`)
            return
        }

        match.data.download()
        notify.success("Downloaded Game File!")
        setLastDownload(Date.now())
    }

    return <>
        <SimulationInfo match={match} />
        
        <Container header="ACTIONS" inner="flex gap-2 justify-around py-8" outer="mx-16">
            <NavigationButton
                text="Download Game File"
                onClick={handleDownload}
            />

            <NavigationButton
                text="View Match Statistics"
                onClick={() => {
                    setData(match.data)
                    notify.success("Loaded Match Data!")
                    router.push("/statistics")
                }}
            />
        </Container>
    </>
}

export default Finished