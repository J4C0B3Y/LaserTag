import Container from "@/components/Container"
import InteractiveBase from "@/components/simulation/base/InteractiveBase"
import type Match from "@/lib/simulation/Match"

const BaseContainer = (props: { match: Match }) => {

    return (
        <Container inner="flex h-16 gap-2" header="BASES">
            {props.match.basesEnabled ? props.match.bases.map(base => 
                <InteractiveBase base={base} key={base.color} />
            ) :
                <h1 className="text-secondary text-xl m-auto">
                    Bases are disabled for this match!
                </h1>
            }
        </Container>
    )
}

export default BaseContainer