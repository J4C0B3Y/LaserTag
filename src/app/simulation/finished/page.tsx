"use client"

import Container from "@/components/Container"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import { notify } from "@/components/provider/impl/NotificationProvider"
import SimulationInfo from "@/components/simulation/info/SimulationInfo"
import Button from "@/components/Button"
import { useRouter } from "next-nprogress-bar"
import { useCooldown } from "@/lib/utils/cooldown"

const Finished = () => {
    /**
     * The current match.
     */
    const { match } = useMatch()

    /**
     * Used to set the match data.
     */
    const { setData } = useMatchData()

    /**
     * Used to navigate between pages.
     */
    const router = useRouter()

    /**
     * Called when the download button is pressed.
     */
    const download = useCooldown("downloading", 1000 * 3, () => {
        // Downloads the match data.
        match.data.download()
        notify.success("Downloaded Game File!")
    })

    return <>
        <SimulationInfo match={match} />

        <Container header="ACTIONS" inner="flex gap-2 justify-around py-8" outer="mx-16">
            <Button
                text="Download Game File"
                onClick={download}
            />

            <Button
                text="View Match Statistics"
                onClick={() => {
                    // Sets the match data and redirects to the statistics page.
                    setData(match.data)
                    notify.success("Loaded Match Data!")
                    router.push("/statistics")
                }}
            />
        </Container>
    </>
}

export default Finished
