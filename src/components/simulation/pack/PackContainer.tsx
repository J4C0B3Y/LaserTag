"use client"

import Container from "@/components/Container"
import AdvancedPack from "@/components/simulation/pack/impl/AdvancedPack"
import MinimalPack from "@/components/simulation/pack/impl/MinimalPack"
import type Match from "@/lib/simulation/Match"
import type Pack from "@/lib/simulation/Pack"
import { useState } from "react"

const PackContainer = (props: { match: Match, minimal?: boolean }) => {
    const [shooter, setShooter] = useState<Pack | null>(null)

    const packs = props.match.packs

    return (
        <Container header="PACKS" inner="flex gap-2 overflow-scroll">
            {packs.map(pack =><>
                {props.minimal ? 
                    <MinimalPack pack={pack} key={pack.id} /> :
                    
                    <AdvancedPack 
                        pack={pack}
                        shooter={shooter}
                        setShooter={setShooter}
                        key={pack.id}
                    />
                }
                {(pack.id + 1) % props.match.teamSize == 0 && pack.id != packs.length - 1 ? (
                    <span className="border-[1px] border-seperator rounded-md" key={`seperator-${pack.team}`} />
                ) : null}
            </>)}
        </Container>
    )
}

export default PackContainer