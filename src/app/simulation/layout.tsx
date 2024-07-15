"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import Navigation from "@/components/simulation/navigation/Navigation"
import { TimerEvent } from "@/lib/Timer"
import { useRouter } from "next-nprogress-bar"
import { useEffect } from "react"

const SimulationLayout = (props: { children: React.ReactNode }) => {
    const { match } = useMatch()
    const router = useRouter()

    useEffect(() => {
        if (match == null) {
            router.push("/")
        } else {
            match.timer.on(TimerEvent.FINISH, () => {
                console.log("ew")
                router.push("/simulation")
            })
        }
    }, [])

    return match == null ? "" : (
        <>
            <Navigation />
            <div className="w-full h-4/5 px-16 flex flex-col gap-6">
                {props.children}
            </div>
        </>
    )
}

export default SimulationLayout