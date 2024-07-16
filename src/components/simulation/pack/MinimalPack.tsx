import Container from "@/components/Container"
import BasePack from "@/components/simulation/pack/BasePack"
import type Pack from "@/lib/simulation/Pack"

const MinimalPack = (props: { pack: Pack }) => {
    return (
        <BasePack pack={props.pack}>
        
        </BasePack>
    )
}

export default MinimalPack