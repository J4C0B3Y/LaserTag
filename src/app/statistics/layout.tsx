"use client"

import Navigation from "@/components/navigation/Navigation"
import NavigationButton from "@/components/navigation/NavigationButton"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next-nprogress-bar"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const StatisticsLayout = (props: { children: React.ReactNode }) => {
    const { data } = useMatchData()
    const router = useRouter()
    const pathname = usePathname()

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
                    <NavigationButton
                        text="GENERAL"
                        onClick={() => router.push("/statistics")}
                        className={cn({ "bg-container": pathname.endsWith("/statistics") })}
                    />
                    <NavigationButton
                        text="ADVANCED"
                        onClick={() => router.push("/statistics/advanced")}
                        className={cn({ "bg-container": pathname.endsWith("/advanced") })}
                    />
                    <NavigationButton
                        text="PLAYERS"
                        onClick={() => router.push("/statistics/players")}
                        className={cn({ "bg-container": pathname.endsWith("/players") })}
                    />
                </>}

                right={<>
                    <NavigationButton
                        text="QUIT"
                        onClick={() => router.push("/")}
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