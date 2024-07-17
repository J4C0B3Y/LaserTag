"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import BaseContainer from "@/components/simulation/base/BaseContainer"
import SimulationInfo from "@/components/simulation/info/SimulationInfo"
import PackContainer from "@/components/simulation/pack/PackContainer"
import type Pack from "@/lib/simulation/Pack"
import { autoupdate } from "@/lib/utils/update"
import { useState } from "react"

const SimulationPage = () => {
    const [shooter, setShooter] = useState<Pack | null>(null)
    const { match } = useMatch()

    autoupdate(10)

    return <>
        <SimulationInfo match={match} />
        <PackContainer match={match} shooter={shooter} setShooter={setShooter} />
        <BaseContainer match={match} shooter={shooter} setShooter={setShooter} />
    </>
}

export default SimulationPage