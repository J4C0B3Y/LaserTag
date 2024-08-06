"use client"

import FileInput from "@/components/input/FileInput"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { notify } from "@/components/provider/impl/NotificationProvider"
import StartSimulation from "@/components/simulation/start/StartSimulation"
import MatchData from "@/lib/statistics/data/MatchData"
import { parse } from "@/lib/utils/json"
import { useRouter } from "next-nprogress-bar"

const HomePage = () => {
    /**
     * Used to set the match data
     */
    const { setData } = useMatchData()

    /**
     * Used to navigate between pages.
     */
    const router = useRouter()

    /**
     * Called when a file is uploaded.
     * 
     * @param file The uploaded file.
     */
    const handleUpload = async (file: File) => {
        // Read the file content.
        const content = await file.text()

        // Parse the file content as json.
        const json = parse(content)

        // Ensure valid json is provided.
        if (json == null) {
            notify.error("Invalid Game File!")
            return
        }

        // Load and set the match data.
        setData(MatchData.from(json))
        notify.success("Loaded Game File!")

        // Navigate to the statistics page.
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
