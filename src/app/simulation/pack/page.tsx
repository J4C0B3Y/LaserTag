"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"
import PackConfig from "@/components/simulation/pack/config/PackConfig"
import PackInfo from "@/components/simulation/pack/config/info/PackInfo"
import PackSharing from "@/components/simulation/pack/config/PackSharing"
import PackContainer from "@/components/simulation/pack/PackContainer"
import type Pack from "@/lib/simulation/Pack"
import { useUpdate } from "@/lib/utils/update"
import { useRouter } from "next-nprogress-bar"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PackConfiguration = () => {
    /**
     * The search parameters for the page.
     */
    const params = useSearchParams()

    /**
     * The id specified in the page's search parameters.
     */
    const id = params.get("id") as number | null

    /**
     * The current match.
     */
    const { match } = useMatch()

    /**
     * The selected pack.
     */
    const [pack, setPack] = useState<Pack>(null as any)

    /**
     * Used to navigate between pages.
     */
    const router = useRouter()

    /**
     * Manually re-renders the page.
     */
    const update = useUpdate()

    /**
     * If the id is invalid, redirect to the simulation page,
     * else set the selected pack using the search parameter id.
     */
    useEffect(() => {
        if (id == null || id < 0 || id > match.packs.length - 1) {
            return router.push("/simulation")
        }

        setPack(match.packs[id])
    }, [id])

    return pack != null && <>
        <div className="flex gap-4">
            <div className="w-2/3 flex flex-col gap-2">
                <PackInfo pack={pack} />
                <PackSharing 
                    match={match} 
                    onImport={update}
                />
            </div>
            <PackConfig 
                pack={pack} 
                match={match} 
                onChange={update}
            />
        </div>
        <PackContainer 
            match={match} 
            config
        />
    </>
}

export default PackConfiguration
