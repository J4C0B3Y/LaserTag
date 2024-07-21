"use client"

import Container from "@/components/Container"
import InteractivePack from "@/components/simulation/pack/impl/InteractivePack"
import ConfigPack from "@/components/simulation/pack/impl/ConfigPack"
import type Match from "@/lib/simulation/Match"
import type Pack from "@/lib/simulation/Pack"
import { Fragment } from "react"

const PackContainer = (props: { 
    match: Match, 
    config?: boolean, 
    shooter?: Pack | null, 
    setShooter?: (shooter: Pack | null) => void 
}) => {
    return (
        <Container header="PACKS" inner="flex gap-2 overflow-scroll overflow-y-hidden">
            {props.match.packs.map(pack =>
                <Fragment key={pack.id}>
                    {props.config ? 
                        <ConfigPack pack={pack} /> :

                        <InteractivePack 
                            pack={pack}
                            shooter={props.shooter!}
                            setShooter={props.setShooter!}
                        />
                    }

                    {(pack.id + 1) % props.match.teamSize == 0 && pack.id != props.match.packs.length - 1 ?
                        <span className="border-[1px] border-seperator rounded-md" />
                    : null}
                </Fragment>
            )}
        </Container>
    )
}

export default PackContainer