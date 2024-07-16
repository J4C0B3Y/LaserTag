"use client"

import Container from "@/components/Container"
import { useGameData } from "@/components/provider/impl/GameDataProvider"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import { notify } from "@/components/provider/impl/NotificationProvider"
import SimulationInfo from "@/components/simulation/info/SimulationInfo"
import NavigationButton from "@/components/simulation/navigation/NavigationButton"
import { useRouter } from "next-nprogress-bar"

const Finished = () => {
    const { match } = useMatch()
    const { setData } = useGameData()
    const router = useRouter()

    return <>
        <SimulationInfo match={match} />
        
        <Container header="ACTIONS" inner="flex gap-2 justify-around py-8" outer="mx-16">
            <NavigationButton
                text="Download Game File"
                onClick={() => match.data.download()}
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