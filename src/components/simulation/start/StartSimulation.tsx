"use client"

import Container from "@/components/Container"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import BasesEnabledInput from "@/components/simulation/start/settings/impl/BasesEnabledInput"
import PackCountInput from "@/components/simulation/start/settings/impl/PackCountInput"
import TeamSizeInput from "@/components/simulation/start/settings/impl/TeamSizeInput"
import MatchSetting from "@/components/simulation/start/settings/MatchSetting"
import { cn } from "@/lib/utils/cn"
import Match, { TeamSize } from "@/lib/simulation/Match"
import { useRouter } from "next-nprogress-bar"
import { useEffect, useState } from "react"
import { notify } from "@/components/provider/impl/NotificationProvider"

const StartSimulation = (props: { className?: string }) => {
    const { setMatch } = useMatch()
    const router = useRouter()

    const [packs, setPacks] = useState(8)
    const [teamSize, setTeamSize] = useState(TeamSize.DUO)
    const [bases, setBases] = useState(true)
    const [invalid, setInvalid] = useState(false)

    useEffect(() => {
        setInvalid(packs % teamSize != 0 || packs == teamSize)
    }, [packs, teamSize])

    const handleStart = () => {
        setMatch(new Match(packs, teamSize, bases))
        notify.success("Started Simulation!")
        router.push("/simulation")
    }

    return (
        <Container inner="p-4 flex flex-col gap-2" outer={props.className}>
            <MatchSetting text="Pack Count" className="mt-2">
                <PackCountInput value={packs} setValue={setPacks} />
            </MatchSetting>
            <MatchSetting text="Team Size">
                <TeamSizeInput value={teamSize} setValue={setTeamSize} />
            </MatchSetting>
            <MatchSetting text="Bases Enabled" className="mb-4">
                <BasesEnabledInput value={bases} setValue={setBases} />
            </MatchSetting>
            <button 
                className={cn(
                    "bg-element border rounded-lg w-full h-full transition-colors",
                    { "bg-container": invalid }
                )}
                onClick={handleStart}
                disabled={invalid}
            >
                <h1 className={cn("text-primary font-semibold text-2xl", { "text-secondary": invalid })}>
                    Start Simulation
                </h1>
            </button>
        </Container>
    )
}

export default StartSimulation