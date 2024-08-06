"use client"

import Container from "@/components/Container"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import BasesEnabledInput from "@/components/simulation/start/settings/impl/BasesEnabledInput"
import PackCountInput from "@/components/simulation/start/settings/impl/pack-count/PackCountInput"
import TeamSizeInput from "@/components/simulation/start/settings/impl/TeamSizeInput"
import MatchSetting from "@/components/simulation/start/settings/MatchSetting"
import { cn } from "@/lib/utils/cn"
import Match, { TeamSize } from "@/lib/simulation/Match"
import { useRouter } from "next-nprogress-bar"
import { useEffect, useState } from "react"
import { notify } from "@/components/provider/impl/NotificationProvider"

const StartSimulation = (props: { 
    /**
     * The container className.
     */
    className?: string 
}) => {
    /**
     * Used to set the current match.
     */
    const { setMatch } = useMatch()

    /**
     * Used to navigate to a different page.
     */
    const router = useRouter()

    /**
     * How many packs are in the match.
     */
    const [packCount, setPackCount] = useState(8)

    /**
     * The match's team size.
     */
    const [teamSize, setTeamSize] = useState(TeamSize.DUO)

    /**
     * If bases are enabled for the match.
     */
    const [basesEanbled, setBasesEnabled] = useState(true)

    /**
     * If the current settings are invalid.
     */
    const [invalid, setInvalid] = useState(false)

    /**
     * When packs, or teamSize changes, 
     * update invalid to reflect its validity.
     */
    useEffect(() => {
        // Make sure there is at least 2 teams and
        // the pack count fits equally into each team.
        setInvalid(packCount % teamSize != 0 || packCount == teamSize)
    }, [packCount, teamSize])

    /**
     * Creates a new match, sends a notification 
     * and redirects to the simulation page.
     */
    const handleStart = () => {
        setMatch(new Match(packCount, teamSize, basesEanbled))
        notify.success("Started Simulation!")
        router.push("/simulation")
    }

    return (
        <Container inner="p-4 flex flex-col gap-2" outer={props.className}>
            <MatchSetting text="Pack Count" className="mt-2">
                <PackCountInput packCount={packCount} setPackCount={setPackCount} />
            </MatchSetting>
            <MatchSetting text="Team Size">
                <TeamSizeInput teamSize={teamSize} setTeamSize={setTeamSize} />
            </MatchSetting>
            <MatchSetting text="Bases Enabled" className="mb-4">
                <BasesEnabledInput basesEnabled={basesEanbled} setBasesEnabled={setBasesEnabled} />
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
