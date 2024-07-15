"use client"

import Container from "@/components/Container"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import NavigationButton from "@/components/simulation/navigation/NavigationButton"
import { autoupdate } from "@/lib/utils"
import { DateTime } from "luxon"
import { useRouter } from "next-nprogress-bar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const Navigation = () => {
    const { match, setMatch } = useMatch()
    const pathname = usePathname()
    const router = useRouter()

    const [quit, setQuit] = useState(false)

    autoupdate(10)

    useEffect(() => {
        setQuit(pathname == "/simulation")
    }, [pathname])

    return (
        <Container inner="flex justify-between p-2 items-center mb-4" dark>
            <div className="flex-1 flex gap-4">
                <NavigationButton text={match.timer.running ? "PAUSE" : "PLAY"} onClick={() => {
                    match.timer[match.timer.running ? "stop" : "start"]()
                }} />

                <NavigationButton text="STATS" onClick={() => {
                    router.push("/simulation/statistics")
                }} />
            </div>
            <div className="text-xl text-stone-800">
                {DateTime.fromMillis(match.timer.elapsed).toFormat("mm.ss.u")}
            </div>
            <div className="flex-1 flex justify-end gap-4">
                <NavigationButton text="HELP" onClick={() => {
                    router.push("/simulation/help")
                }} />

                <NavigationButton text={quit ? "QUIT" : "BACK"} red={quit} onClick={() => {
                    if (quit) {
                        match.end()
                        setMatch(null as any)
                        router.push("/")
                    } else {
                        router.push("/simulation")
                    }
                }} />
            </div>
        </Container>
    )
}

export default Navigation