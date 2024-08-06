"use client"

import type MatchData from "@/lib/statistics/data/MatchData"
import React, { useContext, useState } from "react"

/**
 * The match data context, used in the statistics.
 */
export const MatchDataContext = React.createContext({
    data: null as any as MatchData,
    setData: (data: MatchData) => {}
})

/**
 * Provider for the match data context.
 */
const MatchDataProvider = (props: { children: React.ReactNode }) => {
    const [data, setData] = useState<MatchData>(null as any)

    return (
        <MatchDataContext.Provider value={{ data, setData }}>
            {props.children}    
        </MatchDataContext.Provider>
    )
}

/**
 * A hook to simplify the context call.
 */
export const useMatchData = () => {
    return useContext(MatchDataContext)
}

export default MatchDataProvider
