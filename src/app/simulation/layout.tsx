"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import NavigationButton from "@/components/navigation/NavigationButton"
import Navigation from "@/components/navigation/Navigation"
import { autoupdate, useUpdate } from "@/lib/utils/update"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next-nprogress-bar"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import { DateTime } from "luxon"
import { notify } from "@/components/provider/impl/NotificationProvider"

const SimulationLayout = (props: { children: ReactNode }) => {
    const [quit, setQuit] = useState(true)

    const { match, setMatch } = useMatch()
    const router = useRouter()
    const pathname = usePathname()
    const update = useUpdate()

    autoupdate(10)

    useEffect(() => {
        if (match == null) {
            router.push("/")
            return
        }

        match.timer.onFinish(() => {
            router.push("/simulation/finished")
        })
    }, [])

    useEffect(() => {
        setQuit(pathname == "/simulation" || pathname == "/simulation/finished")
    }, [pathname])

    const handleQuit = () => {
        if (!quit) {
            router.push("/simulation")
            return
        }

        if (!confirm("Are you sure you would like to quit the match?\nThis action is irreversible!")) return

        match.end()
        setMatch(null as any)
        notify.success("Ended Simulation!")
        router.push("/")
    }
    
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
                            {!match.timer.running ? match.finished ? " (Finished)" : " (Paused)" : ""}
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
                        onClick={handleQuit}
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