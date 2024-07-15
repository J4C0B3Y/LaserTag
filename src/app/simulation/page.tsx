"use client"

import Container from "@/components/Container"
import { useGameData } from "@/components/provider/impl/GameDataProvider"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import NavigationButton from "@/components/simulation/navigation/NavigationButton"
import { TeamSize } from "@/lib/simulation/Match"
import { autoupdate } from "@/lib/utils"
import { DateTime } from "luxon"
import { useRouter } from "next-nprogress-bar"

const SimulationPage = () => {
    const router = useRouter()
    const { setData } = useGameData()
    const { match } = useMatch()

    autoupdate(10)

    return (
        <>
            <div className="flex justify-between px-8">
                <Container outer="w-[1300px] mt-4 overflow-hidden" inner="w-[540px]" header="TIME LEFT">
                    <h1 className="font-semibold text-[140px] leading-none text-center pr-12 text-stone-700">
                        {DateTime.fromMillis(match.timer.remaining).toFormat("mm:ss")}
                    </h1>
                </Container>
                <Container outer="w-full" header="MATCH INFO">
                    <h1 className="underline italic text-stone-600 text-2xl">Team Size:</h1>
                    <h1 className="text-center text-[3.35rem] leading-none font-semibold text-stone-700">{TeamSize[match.teamSize]}</h1>
                    <h1 className="underline italic text-stone-600 text-2xl">Pack Count:</h1>
                    <h1 className="text-center text-[3.35rem] leading-none font-semibold text-stone-700">{match.packs.length}</h1>
                </Container>
            </div>
            {!match.finished ? <>
                <Container header="PACKS">

                </Container>
                <Container header="BASES">

                </Container>
            </> : <div className="flex w-full [&>*]:flex-1 px-20 mt-32">
                <NavigationButton text="Download File" onClick={() => {
                    const download = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(match.data))
                    const element = document.createElement("a")
                    element.setAttribute("href", download)
                    element.setAttribute("download", `lasertag-${Date.now()}.json`)
                    element.click()
                    element.remove()
                }} />
                <h1 className="text-xl flex items-center justify-center text-stone-700">OR</h1>
                <NavigationButton text="View Statistics" onClick={() => {
                    setData(match.data)
                    router.push("/statistics")
                }} />
            </div>}
        </>
    )
}

export default SimulationPage