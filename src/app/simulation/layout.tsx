"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import NavigationButton from "@/components/simulation/navigation/NavigationButton"
import Navigation from "@/components/simulation/navigation/Navigation"
import { TimerEvent } from "@/lib/Timer"
import { autoupdate, useUpdate } from "@/lib/utils/update"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next-nprogress-bar"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import { DateTime } from "luxon"

const SimulationLayout = (props: { children: ReactNode }) => {
    const [quit, setQuit] = useState(true)

    const { match } = useMatch()
    const router = useRouter()
    const pathname = usePathname()
    const update = useUpdate()

    autoupdate(10)

    useEffect(() => {
        if (match == null) {
            router.push("/")
            return
        }

        match.timer.on(TimerEvent.FINISH, () => {
            router.push("/simulation/finished")
        })
    }, [])

    useEffect(() => {
        setQuit(pathname == "/simulation" || pathname == "/simulation/finished")
    }, [pathname])
    
    return match == null ? "" : (
        <>
            <Navigation
                left={!match.finished ? <>
                    <NavigationButton 
                        text={match.timer.running ? "PAUSE" : "PLAY"}
                        onClick={() => {
                            match.timer[match.timer.running ? "stop" : "start"]()
                            update()
                        }} 
                    />

                    <NavigationButton
                        text="STATS"
                        onClick={() => router.push("/simulation/statistics")}
                        className={cn({ "bg-container": pathname.endsWith("/statistics") })}
                    />
                </> : null}

                center={
                    <h1 className="text-primary font-semibold text-xl font-mono">
                        {DateTime.fromMillis(match.timer.elapsed).toFormat("mm:ss.u")}
                        <span className="text-secondary">
                            {!match.finished && !match.timer.running ? " (Paused)" : ""}
                        </span>
                    </h1>
                }

                right={<>
                    {!match.finished ? 
                        <NavigationButton
                            text="HELP"
                            onClick={() => router.push("/simulation/help")}
                            className={cn({ "bg-container": pathname.endsWith("/help") })}
                        />
                    : null}

                    <NavigationButton
                        text={quit ? "QUIT" : "BACK"}
                        onClick={() => router.push(quit ? "/" : "/simulation")}
                        className={cn({ "bg-quit": quit })}
                    />
                </>}
            />

            <div className="w-full h-4/5 px-16 flex flex-col gap-6 mt-4">
                {props.children}
            </div>
        </>
    )
}

export default SimulationLayout