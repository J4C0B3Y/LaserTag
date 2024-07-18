import Container from "@/components/Container"
import type Pack from "@/lib/simulation/Pack"

const PackInfo = (props: { pack: Pack }) => {
    return (
        <Container header="PACK INFO" inner="py-4 px-5">
            <div className="flex mb-8">
                <h1 className="flex-1 text-secondary">ID: {props.pack.id}</h1>
                <h1 className="text-primary font-semibold text-2xl">{props.pack.name}</h1>
                <h1 className="flex-1" />
            </div>
            <Statistic text="K/D" value={`${props.pack.kills} - ${props.pack.deaths}`} />
            <Statistic text="KDR" value={`${props.pack.kdr}`} />
            <Statistic text="Score" value={`${props.pack.score}`} />
        </Container>
    )
}

const Statistic = (props: { text: string, value: string }) => {
    return (
        <div className="flex justify-between text-xl">
            <h1 className="text-primary">{props.text}:</h1>
            <h1 className="text-primary">{props.value}</h1>
        </div>
    )
}

export default PackInfo