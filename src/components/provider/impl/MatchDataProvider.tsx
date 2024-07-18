"use client"

import type MatchData from "@/lib/statistics/data/MatchData"
import React, { useContext, useState } from "react"

export const MatchDataContext = React.createContext({
    data: null as any as MatchData,
    setData: (data: MatchData) => {}
})

const MatchDataProvider = (props: { children: React.ReactNode }) => {
    const [data, setData] = useState<MatchData>(null as any)

    return (
        <MatchDataContext.Provider value={{ data, setData }}>
            {props.children}    
        </MatchDataContext.Provider>
    )
}

export const useMatchData = () => {
    return useContext(MatchDataContext)
}

export default MatchDataProvider