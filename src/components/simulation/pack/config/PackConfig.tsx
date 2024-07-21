import Container from "@/components/Container"
import NameInput from "@/components/simulation/pack/config/input/NameInput"
import NumberInput from "@/components/simulation/pack/config/input/NumberInput"
import type Pack from "@/lib/simulation/Pack"
import type { ReactNode } from "react"

const PackConfig = (props: { pack: Pack, update: () => void }) => {

    return (
        <Container header="CONFIGURATION" outer="w-full" inner="flex flex-col gap-4 p-4">
            <NameInput pack={props.pack} update={props.update} />
            <ConfigRow>
                <NumberInput header="SCORE ADJUSTMENT" />
                <NumberInput header="SCORE MULTIPLIER" />
            </ConfigRow>
        </Container>
    )
}

const ConfigRow = (props: { children: ReactNode }) => {
    return (
        <div className="flex gap-4">
            {props.children}
        </div>
    )
}

export default PackConfig