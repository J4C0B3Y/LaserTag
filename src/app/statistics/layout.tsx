"use client"

import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { useRouter } from "next-nprogress-bar"
import { useEffect } from "react"

const StatisticsLayout = (props: { children: React.ReactNode }) => {
    const { data } = useMatchData()
    const router = useRouter()

    useEffect(() => {
        if (data == null) {
            router.push("/")
            return
        }
    }, [])

    return data != null ? props.children : ""
}

export default StatisticsLayout