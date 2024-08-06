"use client"

import Container from "@/components/Container"
import InteractivePack from "@/components/simulation/pack/impl/interactive/InteractivePack"
import ConfigPack from "@/components/simulation/pack/impl/ConfigPack"
import type Match from "@/lib/simulation/Match"
import type Pack from "@/lib/simulation/Pack"
import { Fragment } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const PackContainer = (props: { 
    /**
     * The match to display the packs from.
     */
    match: Match, 

    /**
     * If the container should display config packs.
     */
    config?: boolean, 

    /**
     * The shooter.
     */
    shooter?: Pack | null, 

    /**
     * A function to set the shooter.
     * 
     * @param shooter The shooter.
     */
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

                    {/* If there is a switch in the teams, display a seperator bar. */}
                    {(pack.id + 1) % props.match.teamSize == 0 && pack.id != props.match.packs.length - 1 ?
                        <span className="border-[1px] border-seperator rounded-md" />
                    : null}
                </Fragment>
            )}
        </Container>
    )
}

export default PackContainer
