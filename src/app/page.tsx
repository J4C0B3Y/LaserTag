"use client"

import FileInput from "@/components/input/FileInput"
import { useGameData } from "@/components/provider/impl/GameDataProvider"
import { safeParse } from "@/lib/utils"
import { useRouter } from "next-nprogress-bar"
import { useEffect } from "react"

const HomePage = () => {
    const { data, setData } = useGameData()
    const router = useRouter()

    const handleUpload = async (file: File) => {
        const content = await file.text()
        const json = safeParse(content)

        if (json == null) {
            alert("Invalid Game File!")
            return
        }

        setData(json)
    }

    useEffect(() => {
        if (data != null) {
            router.push("/statistics")
        }
    }, [data])

    return (
        <div className="flex items-center justify-between h-full">
            <FileInput onFile={handleUpload} />
        </div>
    )
}

export default HomePage