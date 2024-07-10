"use client"

import { useRouter } from "next-nprogress-bar"
import { useEffect } from "react"

const StatisticsPage = () => {
    const router = useRouter()

    useEffect(() => {
        router.push("/statistics/general")
    }, [])
}

export default StatisticsPage