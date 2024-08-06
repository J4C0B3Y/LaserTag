"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import BaseContainer from "@/components/simulation/base/BaseContainer"
import SimulationInfo from "@/components/simulation/info/SimulationInfo"
import PackContainer from "@/components/simulation/pack/PackContainer"
import type Pack from "@/lib/simulation/Pack"
import { useAutoUpdate } from "@/lib/utils/update"
import { useState } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const SimulationPage = () => {
    /**
     * Used to get and set the shooter.
     */
    const [shooter, setShooter] = useState<Pack | null>(null)

    /**
     * The match.
     */
    const { match } = useMatch()

    /**
     * Re-render the page every 10ms.
     */
    useAutoUpdate(10)

    return <>
        <SimulationInfo match={match} />
        <PackContainer match={match} shooter={shooter} setShooter={setShooter} />
        <BaseContainer match={match} shooter={shooter} setShooter={setShooter} />
    </>
}

export default SimulationPage
