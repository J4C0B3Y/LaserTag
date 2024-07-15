"use client"

import Container from "@/components/Container"

const Help = () => {
    return (
        <Container header="HELP" inner="flex gap-[2px] p-0 overflow-hidden bg-stone-500" outer="h-full">
            <div className="flex-1 bg-stone-300 p-4">
                <h1 className="text-stone-600 font-semibold text-3xl text-center">Score Calculation</h1>
                <img className="h-96 my-4 mx-auto" src="/help.png" alt="Help" />
                <h1 className="text-stone-600 font-semibold text-3xl text-center">SCORE ≥ 0</h1>
            </div>
            <div className="flex flex-col gap-[2px] flex-1 bg-stone-500">
                <div className="flex-1 bg-stone-300 p-4">
                    <h1 className="text-stone-600 font-semibold text-3xl text-center mb-2">Packs</h1>
                    <h1 className="text-stone-600 text-2xl text-justify leading-8">
                        Each pack (player) has a score, the player or team who
                        has the highest score at the end of the match wins the game.
                    </h1>
                </div>
                <div className="flex-1 bg-stone-300 p-4">
                    <h1 className="text-stone-600 font-semibold text-3xl text-center mb-2">Bases</h1>
                    <h1 className="text-stone-600 text-2xl text-justify leading-8">
                        There are four bases that give 10,000 score when shot by a player.
                        Once shot, the base will be disabled for 10 seconds.
                    </h1>
                </div>
            </div>
        </Container>
    )
}

export default Help