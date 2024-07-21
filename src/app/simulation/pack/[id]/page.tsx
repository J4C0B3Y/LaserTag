"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import PackConfig from "@/components/simulation/pack/config/PackConfig"
import PackInfo from "@/components/simulation/pack/config/PackInfo"
import PackSharing from "@/components/simulation/pack/config/PackSharing"
import PackContainer from "@/components/simulation/pack/PackContainer"
import { useUpdate } from "@/lib/utils/update"

const PackConfiguration = (props: { params: { id: number } }) => {
    const { match } = useMatch()
    const update = useUpdate()

    const pack = match.packs[props.params.id]

    return <>
        <div className="flex gap-4">
            <div className="w-2/3 flex flex-col gap-2">
                <PackInfo pack={pack} />
                <PackSharing onApply={update} />
            </div>
            <PackConfig pack={pack} match={match} onChange={update} />
        </div>
        <PackContainer match={match} config />
    </>
}

export default PackConfiguration