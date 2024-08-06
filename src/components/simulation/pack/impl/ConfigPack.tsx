import BasePack from "@/components/simulation/pack/BasePack"
import PackButton from "@/components/simulation/pack/PackButton"
import type Pack from "@/lib/simulation/Pack"
import { useRouter } from "next-nprogress-bar"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const ConfigPack = (props: { 
    /**
     * The pack to configer
     */
    pack: Pack
 }) => {
    /**
     * Used to navigate between pages.
     */
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
