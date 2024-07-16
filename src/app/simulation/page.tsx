"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import BaseContainer from "@/components/simulation/base/BaseContainer"
import SimulationInfo from "@/components/simulation/info/SimulationInfo"
import PackContainer from "@/components/simulation/pack/PackContainer"
import { autoupdate } from "@/lib/utils/update"

const SimulationPage = () => {
    const { match } = useMatch()

    autoupdate(10)

    return <>
        <SimulationInfo match={match} />
        <PackContainer match={match} />
        <BaseContainer match={match} />
    </>
}

export default SimulationPage