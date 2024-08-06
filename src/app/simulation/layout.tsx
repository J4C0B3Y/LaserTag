"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import Button from "@/components/Button"
import Navigation from "@/components/navigation/Navigation"
import { useAutoUpdate, useUpdate } from "@/lib/utils/update"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next-nprogress-bar"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import { DateTime } from "luxon"
import { notify } from "@/components/provider/impl/NotificationProvider"
import QuitConfirmationModal from "@/components/modal/impl/QuitConfirmationModal"

const SimulationLayout = (props: { children: ReactNode }) => {
    /**
     * If the quit button is shown.
     */
    const [quit, setQuit] = useState(true)

    /**
     * If the quit confirmation modal is shown.
     */
    const [confirm, setConfirm] = useState(false)

    /**
     * The current match.
     */
    const { match, setMatch } = useMatch()

    /**
     * Used to navigate between pages.
     */
    const router = useRouter()

    /**
     * The pathname of the current page.
     */
    const pathname = usePathname()

    /**
     * Used to manually re-rended the component.
     */
    const update = useUpdate()

    /**
     * Auto re-render the page.
     */
    useAutoUpdate(10)

    useEffect(() => {
        // If there is no match, redirect to the upload page.
        if (match == null) {
            return router.push("/")
        }

        // Redirect to the finished page when the match timer ends.
        match.timer.onFinish(() => {
            router.push("/simulation/finished")
        })
    }, [])

    /**
     * Show the quit button if we are currently not on a sub page.
     */
    useEffect(() => {
        setQuit(pathname == "/simulation" || pathname == "/simulation/finished")
    }, [pathname])

    /**
     * Called when the quit / back button is pressed.
     */
    const handleQuit = () => {
        // If the back button is pressed, go back.
        if (!quit) {
            return router.push("/simulation")
        }

        // Else open the quit confirmation modal.
        setConfirm(true)
    }
    
    return match == null ? "" : (
        <>
            <Navigation
                left={!match.finished ? <>
                    <Button 
                        text={match.timer.running ? "PAUSE" : "PLAY"}
                        onClick={() => {
                            // Toggle the timer and update the page.
                            match.timer[match.timer.running ? "stop" : "start"]()
                            update()
                        }} 
                    />

                    <Button
                        text="STATS"
                        onClick={() => router.push("/simulation/statistics")}
                        className={cn({ "bg-container": pathname.endsWith("/statistics") })}
                    />
                </> : null}

                center={
                    <h1 className="text-primary font-semibold text-xl font-mono">
                        {/* The formatted elapsed match time. */}
                        {DateTime.fromMillis(match.timer.elapsed).toFormat("mm:ss.u")}
                        <span className="text-secondary">
                            {/* Show (Finished) or (Paused) depending on the match state. */}
                            {!match.timer.running ? match.finished ? " (Finished)" : " (Paused)" : ""}
                        </span>
                    </h1>
                }

                right={<>
                    {!match.finished ? 
                        <Button
                            text="HELP"
                            onClick={() => router.push("/simulation/help")}
                            className={cn({ "bg-container": pathname.endsWith("/help") })}
                        />
                    : null}

                    <Button
                        text={quit ? "QUIT" : "BACK"}
                        onClick={handleQuit}
                        className={cn({ "bg-quit": quit })}
                    />
                </>}
            />

            <QuitConfirmationModal
                open={confirm}
                setOpen={setConfirm}
                onConfirm={() => {
                    // End and clear the match.
                    match.forceEnd()
                    setMatch(null as any)

                    // Redirect to the upload page.
                    notify.success("Ended Simulation!")
                    router.push("/")
                }}
            />

            <div className="w-full h-4/5 px-16 flex flex-col gap-6 mt-4">
                {props.children}
            </div>
        </>
    )
}

export default SimulationLayout