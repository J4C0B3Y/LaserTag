import Container from "@/components/Container"
import StandoutEntry from "@/components/statistics/pack/standouts/StandoutEntry"
import { amount, Comparator, Filter, multi, between } from "@/lib/statistics/calculation/general"
import { calculate } from "@/lib/statistics/calculation/pack"
import { EventType } from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"

const StandoutGrid = (props: { 
    /**
     * The packs to perform calculations on.
     */
    packs: Array<PackData>
}) => {

    return (
        <Container header="STANDOUTS" inner="grid gap-2 grid-cols-2">
            <StandoutEntry
                label="Top Score"
                data={calculate(props.packs, pack => pack.score)}
            />
            <StandoutEntry
                label="Most Kills"
                data={calculate(props.packs, pack => amount(pack, EventType.KILL))}
            />
            <StandoutEntry
                label="Most Deaths"
                data={calculate(props.packs, pack => amount(pack, EventType.DEATH))}
            />
            <StandoutEntry
                label="Most Bases Shot"
                data={calculate(props.packs, pack => amount(pack, EventType.BASE))}
            />
            <StandoutEntry
                label="Hightest Multi Kill"
                data={calculate(props.packs, pack => multi(pack, EventType.KILL))}
            />
            <StandoutEntry
                label="Highest Activity"
                data={calculate(props.packs, pack => between(pack), Comparator.DESCENDING, Filter.NON_ZERO )}
                format
            />
        </Container>
    )
}



export default StandoutGrid
