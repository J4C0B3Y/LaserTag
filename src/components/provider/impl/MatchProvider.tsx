"use client"

import type Match from "@/lib/simulation/Match"
import React, { useContext, useState } from "react"

export const MatchContext = React.createContext({
    match: null as any as Match,
    setMatch: (match: Match) => {}
})

export const MatchProvider = (props: { children: React.ReactNode }) => {
    const [match, setMatch] = useState<Match>(null as any)

    return (
        <MatchContext.Provider value={{ match, setMatch }}>
            {props.children}    
        </MatchContext.Provider>
    )
}

export const useMatch = () => {
    return useContext(MatchContext)
}