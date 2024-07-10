"use client"

import { useGameData } from "@/components/provider/impl/GameDataProvider"
import { useRouter } from "next-nprogress-bar"
import { useContext, useEffect } from "react"

const StatisticsLayout = (props: { children: React.ReactNode }) => {
    const { data } = useGameData()
    const router = useRouter()

    useEffect(() => {
        if (data == null) {
            router.push("/")
        }
    }, [])

    return data != null ? props.children : ""
}

export default StatisticsLayout