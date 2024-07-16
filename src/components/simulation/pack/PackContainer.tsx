"use client"

import Container from "@/components/Container"
import AdvancedPack from "@/components/simulation/pack/AdvancedPack"
import MinimalPack from "@/components/simulation/pack/MinimalPack"
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
                    <MinimalPack pack={pack} /> :
                    
                    <AdvancedPack 
                        pack={pack}
                        shooter={shooter}
                        setShooter={setShooter}
                    />
                }
                { (pack.id + 1) % props.match.teamSize == 0 && pack.id != packs.length - 1 ? (
                    <span className="border-[1px] border-seperator rounded-md" />
                ) : null}
            </>)}
        </Container>
    )
}

export default PackContainer