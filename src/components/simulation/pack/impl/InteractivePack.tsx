import BasePack, { PackButton } from "@/components/simulation/pack/BasePack"
import type Pack from "@/lib/simulation/Pack"
import { cn } from "@/lib/utils/cn"
import { DateTime } from "luxon"
import { useRouter } from "next-nprogress-bar"

const InteractivePack = (props: { pack: Pack, shooter: Pack | null, setShooter: (shooter: Pack | null) => void }) => {
    const router = useRouter()

    const shooter = props.shooter != null
    const shooting = shooter && props.shooter == props.pack
    const team = shooter && props.shooter!.team == props.pack.team
    const disabled = !shooting && team || props.pack.disabled

    const handleShoot = () => {
        if (!shooter) {
            props.setShooter(props.pack)
            return
        }

        if (props.shooter == props.pack) {
            props.setShooter(null)
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
                    text={props.pack.disabled ? 
                        DateTime.fromMillis(props.pack.cooldown + 999).toFormat("s") + "s" : 
                        props.shooter ? shooting ? "CANCEL" : "SHOOT" : "SELECT"
                    } 
                    className={cn({
                        "bg-shoot": shooter && !disabled && !shooting,
                        "opacity-50 bg-element text-secondary": disabled
                    })}
                    onClick={handleShoot}
                    disabled={disabled}
                />
                <PackButton 
                    text="CONFIG"
                    onClick={() => router.push(`/simulation/pack/${props.pack.id}`)}
                />
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

export default InteractivePack