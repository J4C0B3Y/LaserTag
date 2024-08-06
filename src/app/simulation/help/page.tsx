"use client"

import Container from "@/components/Container"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import ScoreCalculation from "@/components/simulation/help/score/ScoreCalculation"
import Button from "@/components/Button"
import { useState } from "react"
import QuitConfirmationModal from "@/components/modal/impl/QuitConfirmationModal"
import HelpHeader from "@/components/simulation/help/HelpHeader"
import HelpFooter from "@/components/simulation/help/HelpFooter"
import HelpContent from "@/components/simulation/help/HelpContent"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const Help = () => {
    /**
     * The current match.
     */
    const { match } = useMatch()

    /**
     * If the quit confirmation modal is open.
     */
    const [confirm, setConfirm] = useState(false)

    return (
        <div className="flex gap-4">
            <Container header="HELP" outer="flex-1">
                <HelpHeader>Score Calculation</HelpHeader>
                <ScoreCalculation />
                <HelpFooter>SCORE ≥ 0</HelpFooter>
            </Container>
            <div className="flex-1 flex flex-col gap-2">
                <Container header="&nbsp;" outer="pb-2">
                    <HelpHeader>Packs</HelpHeader>
                    <HelpContent>
                        Each pack (player) has a score. The player or team who
                        has the highest score at the end of the match wins the game.
                    </HelpContent>
                </Container>
                <Container>
                    <HelpHeader>Bases</HelpHeader>
                    <HelpContent>
                        There are four bases that give 10,000 score when shot by a player.
                        Once shot, the base will be disabled for 10 seconds.
                    </HelpContent>
                </Container>
                <Container header="CONTROLS">
                    <QuitConfirmationModal
                        open={confirm}
                        setOpen={setConfirm}
                        onConfirm={() => match.forceEnd()}
                    />
                    <Button 
                        text="FORCE END MATCH"
                        className="w-full bg-quit"
                        onClick={() => setConfirm(true)}
                    />
                </Container>
            </div>
        </div>
    )
}

export default Help
