import Container from "@/components/Container"
import NameInput from "@/components/simulation/pack/config/input/NameInput"
import type Pack from "@/lib/simulation/Pack"

const PackConfig = (props: { pack: Pack, update: () => void }) => {

    return (
        <Container header="CONFIGURATION" outer="w-full" inner="flex flex-col gap-4 p-4">
            <NameInput pack={props.pack} update={props.update} />
        </Container>
    )
}

export default PackConfig