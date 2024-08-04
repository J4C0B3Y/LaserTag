"use client"

import Navigation from "@/components/navigation/Navigation"
import Button from "@/components/Button"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next-nprogress-bar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import QuitConfirmationModal from "@/components/modal/impl/QuitConfirmationModal"

const StatisticsLayout = (props: { children: React.ReactNode }) => {
    const { data } = useMatchData()
    const router = useRouter()
    const pathname = usePathname()
    const [confirm, setConfirm] = useState(false)

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
                        text="PLAYERS"
                        onClick={() => router.push("/statistics/players")}
                        className={cn({ "bg-container": pathname.endsWith("/players") })}
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