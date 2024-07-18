"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import PackContainer from "@/components/simulation/pack/PackContainer"

const PackConfiguration = (props: { params: { id: number } }) => {
    const { match } = useMatch()
    const pack = match.packs[props.params.id]

    return <>
        {pack.name}
        <PackContainer match={match} config />
    </>
}

export default PackConfiguration