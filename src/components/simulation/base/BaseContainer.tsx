import Container from "@/components/Container"
import InteractiveBase from "@/components/simulation/base/InteractiveBase"
import type Match from "@/lib/simulation/Match"
import type Pack from "@/lib/simulation/Pack"

const BaseContainer = (props: {
    /**
     * The match to display bases from.
     */
    match: Match,

    /**
     * The shooter.
     */
    shooter: Pack | null,

    /**
     * The function to set the shooter.
     * 
     * @param shooter The shooter.
     */
    setShooter: (shooter: Pack | null) => void
}) => {
    return (
        <Container inner="flex gap-2 items-center" header="BASES">
            {props.match.basesEnabled ? props.match.bases.map(base => 
                <InteractiveBase 
                    base={base} 
                    key={base.color}
                    shooter={props.shooter}
                    setShooter={props.setShooter}
                />
            ) :
                // Displays a warning if bases are disabled for the match.
                <h1 className="text-secondary text-xl m-auto h-14 flex items-center">
                    Bases are disabled for this match!
                </h1>
            }
        </Container>
    )
}

export default BaseContainer
