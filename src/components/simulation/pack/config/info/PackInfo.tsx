import Container from "@/components/Container"
import PackInfoStatistic from "@/components/simulation/pack/config/info/PackInfoStatistic"
import type Pack from "@/lib/simulation/Pack"

const PackInfo = (props: { 
    /**
     * The pack to display information on.
     */
    pack: Pack
 }) => {
    return (
        <Container header="PACK INFO" inner="py-4 px-5">
            <div className="flex mb-8">
                <h1 className="flex-1 text-secondary">ID: {props.pack.id}</h1>
                <h1 className="text-primary font-semibold text-2xl">{props.pack.name}</h1>
                <h1 className="flex-1" />
            </div>
            <PackInfoStatistic text="K/D" value={`${props.pack.kills} - ${props.pack.deaths}`} />
            <PackInfoStatistic text="KDR" value={`${props.pack.kdr}`} />
            <PackInfoStatistic text="Score" value={`${props.pack.score}`} />
        </Container>
    )
}

export default PackInfo