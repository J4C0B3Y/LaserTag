import BasePack, { PackButton } from "@/components/simulation/pack/BasePack"
import type Pack from "@/lib/simulation/Pack"
import { useRouter } from "next-nprogress-bar"

const ConfigPack = (props: { pack: Pack }) => {
    const router = useRouter()

    return (
        <BasePack 
            pack={props.pack}
            buttons={
                <PackButton 
                    text="SWITCH"
                    onClick={() => router.push(`/simulation/pack?id=${props.pack.id}`)}
                />
            }
        />
    )
}

export default ConfigPack