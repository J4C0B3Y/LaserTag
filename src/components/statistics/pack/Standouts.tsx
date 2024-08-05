import Container from "@/components/Container"
import { Filter, filter, format, multi, time } from "@/lib/statistics/calculation/GeneralCalculations"
import { calculate, Comparator } from "@/lib/statistics/calculation/PackCalculations"
import MatchData, { EventType } from "@/lib/statistics/data/MatchData"
import PackData from "@/lib/statistics/data/PackData"

const Standouts = (props: { match: MatchData }) => {
    const packs = props.match.packs

    return (
        <Container header="STANDOUTS" inner="grid gap-2 grid-cols-2">
            <Standout
                label="Top Score"
                data={calculate(packs, pack => pack.score)}
            />
            <Standout
                label="Most Kills"
                data={calculate(packs, pack => filter(pack, EventType.KILL).length)}
            />
            <Standout
                label="Most Deaths"
                data={calculate(packs, pack => filter(pack, EventType.DEATH).length)}
            />
            <Standout
                label="Most Bases Shot"
                data={calculate(packs, pack => filter(pack, EventType.BASE).length)}
            />
            <Standout
                label="Hightest Multi Kill"
                data={calculate(packs, pack => multi(pack, EventType.KILL))}
            />
            <Standout
                label="Highest Activity"
                data={calculate(
                    packs,
                    pack => time(pack),
                    Filter.NON_ZERO,
                    Comparator.DESCENDING
                )}
                format
            />
        </Container>
    )
}

const Standout = (props: { label: string, data: { pack: PackData, value: number }, format?: boolean }) => {
    return (
        <Container inner="bg-element text-center flex flex-col gap-3">
            <h1 className="text-primary text-2xl">
                {props.label}
            </h1>
            <h1 className="text-primary text-5xl font-semibold">
                {props.format ? format(props.data.value) : props.data.value}
            </h1>
            <h1 className="text-secondary text-2xl">
                {props.data.pack.name}
            </h1>
        </Container>
    )
}

export default Standouts
