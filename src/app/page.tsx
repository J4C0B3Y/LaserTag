"use client"

import FileInput from "@/components/input/FileInput"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { notify } from "@/components/provider/impl/NotificationProvider"
import StartSimulation from "@/components/simulation/start/StartSimulation"
import MatchData from "@/lib/statistics/data/MatchData"
import Json from "@/lib/utils/Json"
import { useRouter } from "next-nprogress-bar"

const HomePage = () => {
    const { setData } = useMatchData()
    const router = useRouter()

    const handleUpload = async (file: File) => {
        const content = await file.text()
        const json = Json.safeParse(content)

        if (json == null) {
            notify.error("Invalid Game File!")
            return
        }

        setData(MatchData.from(json))
        notify.success("Loaded Game File!")
        router.push("/statistics")
    }

    return (
        <div className="flex justify-between items-center py-auto h-full [&>*]:flex-1">
            <FileInput onFile={handleUpload} inner="h-64" accept="application/json" />
            <h1 className="text-secondary font-semibold text-3xl text-center">OR</h1>
            <StartSimulation className="h-64" />
        </div>
    )
}

export default HomePage