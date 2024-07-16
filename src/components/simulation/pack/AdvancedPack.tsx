import BasePack, { PackButton } from "@/components/simulation/pack/BasePack"
import type Pack from "@/lib/simulation/Pack"
import { cn } from "@/lib/utils/cn"

const AdvancedPack = (props: { pack: Pack, shooter: Pack | null, setShooter: (shooter: Pack | null) => void }) => {
    const shooting = props.shooter != null
    const disabled = shooting && props.shooter!.team == props.pack.team

    const handleShoot = () => {
        if (!shooting) {
            props.setShooter(props.pack)
            return
        }

        props.shooter!.shoot(props.pack)
        props.setShooter(null)
    }

    return (
        <BasePack
            pack={props.pack}
            buttons={<>
                <PackButton 
                    text={props.shooter ? "SHOOT" : "SELECT"} 
                    className={cn({
                        "bg-shoot": shooting && !disabled,
                        "opacity-50 bg-element text-secondary": disabled
                    })}
                    onClick={handleShoot}
                    disabled={disabled}
                />
                <PackButton text="CONFIG" />
            </>}
        >
            <Statistic text="K/D" value={`${props.pack.kills} - ${props.pack.deaths}`} />
            <Statistic text="KDR" value={`${props.pack.kdr}`} />
            <Statistic text="Score" value={`${props.pack.score}`} />
        </BasePack>
    )
}

const Statistic = (props: { text: string, value: string }) => {
    return (
        <div className="flex justify-between px-2">
            <h1 className="text-primary">{props.text}:</h1>
            <h1 className="text-primary">{props.value}</h1>
        </div>
    )
}

export default AdvancedPack