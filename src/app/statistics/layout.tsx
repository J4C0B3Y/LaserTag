"use client"

import Navigation from "@/components/navigation/Navigation"
import Button from "@/components/Button"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next-nprogress-bar"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import QuitConfirmationModal from "@/components/modal/impl/QuitConfirmationModal"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const StatisticsLayout = (props: { 
    /**
     * The page to display.
     */
    children: ReactNode
}) => {
    /**
     * The match data.
     */
    const { data } = useMatchData()

    /**
     * Used to navigate between pages.
     */
    const router = useRouter()

    /**
     * The current page pathname.
     */
    const pathname = usePathname()

    /**
     * If the quit confirmation modal is open.
     */
    const [confirm, setConfirm] = useState(false)

    /**
     * If there is no data, redirect to the upload.
     */
    useEffect(() => {
        if (data == null) {
            router.push("/")
            return
        }
    }, [])

    return data == null ? "" : (
        <>
            <Navigation
                left={<>
                    <Button
                        text="GENERAL"
                        onClick={() => router.push("/statistics")}
                        className={cn({ "bg-container": pathname.endsWith("/statistics") })}
                    />
                    <Button
                        text="ADVANCED"
                        onClick={() => router.push("/statistics/advanced")}
                        className={cn({ "bg-container": pathname.endsWith("/advanced") })}
                    />
                    <Button
                        text="PACK"
                        onClick={() => router.push("/statistics/pack")}
                        className={cn({ "bg-container": pathname.endsWith("/pack") })}
                    />
                </>}

                right={<>
                    <QuitConfirmationModal
                        open={confirm}
                        setOpen={setConfirm}
                        onConfirm={() => router.push("/")}
                    />
                    <Button
                        text="QUIT"
                        // Show the quit confirmation modal.
                        onClick={() => setConfirm(true)}
                        className="bg-quit"
                    />
                </>}
            />
            <div className="w-full h-4/5 px-16 flex flex-col gap-6 mt-4">
                {props.children}
            </div>
        </>
    )
}

export default StatisticsLayout
