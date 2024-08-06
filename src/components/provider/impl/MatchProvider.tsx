"use client"

import type Match from "@/lib/simulation/Match"
import React, { useContext, useState } from "react"

/**
 * The match context, used in the simulation.
 */
export const MatchContext = React.createContext({
    match: null as any as Match,
    setMatch: (match: Match) => {}
})

/**
 * Provider for the match context.
 */
const MatchProvider = (props: { children: React.ReactNode }) => {
    const [match, setMatch] = useState<Match>(null as any)

    return (
        <MatchContext.Provider value={{ match, setMatch }}>
            {props.children}    
        </MatchContext.Provider>
    )
}

/**
 * A hook to simplify the context call.
 */
export const useMatch = () => {
    return useContext(MatchContext)
}

export default MatchProvider
