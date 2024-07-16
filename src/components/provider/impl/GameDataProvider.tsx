"use client"

import type GameData from "@/lib/statistics/GameData"
import React, { useContext, useState } from "react"

export const GameDataContext = React.createContext({
    data: null as any as GameData,
    setData: (data: GameData) => {}
})

const GameDataProvider = (props: { children: React.ReactNode }) => {
    const [data, setData] = useState<GameData>(null as any)

    return (
        <GameDataContext.Provider value={{ data, setData }}>
            {props.children}    
        </GameDataContext.Provider>
    )
}

export const useGameData = () => {
    return useContext(GameDataContext)
}

export default GameDataProvider