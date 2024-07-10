"use client"

import Container from "@/components/Container"
import FileInput from "@/components/input/FileInput"
import MatchSetting from "@/components/match-settings/MatchSetting"
import { useGameData } from "@/components/provider/impl/GameDataProvider"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import Match, { TeamSize } from "@/lib/simulation/Match"
import { cn, safeParse } from "@/lib/utils"
import { useRouter } from "next-nprogress-bar"
import { useEffect, useState } from "react"

const HomePage = () => {
    const { data, setData } = useGameData()
    const { match, setMatch } = useMatch()

    const [packs, setPacks] = useState(8)
    const [size, setSize] = useState(TeamSize.DUO)
    const [bases, setBases] = useState(true)
    const [valid, setValid] = useState(true)

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

    const handleStart = () => {
        setMatch(new Match(packs, size, bases))
        router.push("/simulation")
    }

    useEffect(() => {
        setValid(packs % size == 0)
    }, [packs, size])

    useEffect(() => {
        if (data != null) {
            router.push("/statistics")
        }
    }, [data])

    return (
        <div className="flex items-center justify-between h-full">
            <FileInput onFile={handleUpload} className="flex-1 h-64" />
            <h1 className="flex-1 text-3xl text-stone-600 text-center">OR</h1>
            <Container className="flex-1 flex flex-col h-64">
                <MatchSetting name="Pack Count" className="mt-2">
                    TODO: Packs Input
                </MatchSetting>
                <MatchSetting name="Team Size">
                    TODO: Size Input
                </MatchSetting>
                <MatchSetting name="Bases Enabled">
                    TODO: Bases Input
                </MatchSetting>
                <button
                    className={cn(
                        "border-2 border-stone-500 p-2 mt-6 h-20 bg-stone-200 rounded-lg text-2xl transition-colors",
                        { "bg-stone-300 text-stone-500": !valid }
                    )}
                    onClick={handleStart}
                    disabled={!valid}
                >
                    Start Simulation
                </button>
            </Container>
        </div>
    )
}

export default HomePage