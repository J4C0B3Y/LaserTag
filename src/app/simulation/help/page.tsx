"use client"

import Container from "@/components/Container"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import ScoreCalculation from "@/components/simulation/help/ScoreCalculation"
import NavigationButton from "@/components/navigation/NavigationButton"

const Help = () => {
    const { match } = useMatch()

    return (
        <div className="flex gap-4">
            <Container header="HELP" outer="flex-1">
                <HelpHeader>Score Calculation</HelpHeader>
                <ScoreCalculation />
                <HelpFooter>SCORE ≥ 0</HelpFooter>
            </Container>
            <div className="flex-1 flex flex-col gap-4">
                <Container header="&nbsp;">
                    <HelpHeader>Packs</HelpHeader>
                    <HelpContent>
                        Each pack (player) has a score, the player or team who
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
                    <NavigationButton 
                        text="FORCE END MATCH"
                        className="w-full bg-danger"
                        onClick={() => match.end()}
                    />
                </Container>
            </div>
        </div>
    )
}

const HelpHeader = (props: { children: string }) => {
    return (
        <h1 className="text-center text-primary text-2xl font-semibold mt-1">
            {props.children}
        </h1>
    )
}

const HelpContent = (props: { children: string }) => {
    return (
        <h1 className="text-justify text-primary text-xl p-2 my-4">
            {props.children}
        </h1>
    )
}

const HelpFooter = (props: { children: string }) => {
    return (
        <h1 className="text-center text-primary text-xl font-semibold mt-3">
            {props.children}
        </h1>
    )
}

export default Help