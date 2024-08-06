import BasePack from "@/components/simulation/pack/BasePack"
import InteractivePackStatistic from "@/components/simulation/pack/impl/interactive/InteractivePackStatistics"
import PackButton from "@/components/simulation/pack/PackButton"
import type Pack from "@/lib/simulation/Pack"
import { cn } from "@/lib/utils/cn"
import { DateTime } from "luxon"
import { useRouter } from "next-nprogress-bar"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const InteractivePack = (props: { 
    /**
     * The pack to display.
     */
    pack: Pack, 

    /**
     * The shooter.
     */
    shooter: Pack | null, 

    /**
     * The function to set the shooter.
     * 
     * @param shooter The shooter.
     */
    setShooter: (shooter: Pack | null) => void
}) => {
    /**
     * Used to navigate between pages.
     */
    const router = useRouter()

    /**
     * If there is a shooter selected.
     */
    const hasShooter = props.shooter != null

    /**
     * If the shooter is the current pack.
     */
    const isShooter = hasShooter && props.shooter == props.pack

    /**
     * If the current page is safe from the 
     * shooter because they are on the same team.
     */
    const isShooterTeam = hasShooter && props.shooter!.team == props.pack.team

    /**
     * If the pack is safe from being shot, it should show as disabled.
     */
    const disabled = !isShooter && isShooterTeam || props.pack.disabled

    /**
     * Called when the shoot button is clicked.
     */
    const handleShoot = () => {
        // If there is no shooter, set the shooter to the current pack.
        if (!hasShooter) {
            return props.setShooter(props.pack)
        }

        // If the current pack is the shooter, cancel the shot.
        if (props.shooter == props.pack) {
            return props.setShooter(null)
        }

        // Shoot the target pack.
        props.shooter!.shoot(props.pack)
        props.setShooter(null)
    }

    return (
        <BasePack
            pack={props.pack}
            className={isShooter ? "bg-selected" : ""}
            buttons={<>
                <PackButton 
                    text={props.pack.disabled ? 
                        DateTime.fromMillis(props.pack.cooldown + 999).toFormat("s") + "s" : 
                        props.shooter ? isShooter ? "CANCEL" : "SHOOT" : "SELECT"
                    } 
                    className={cn({
                        "bg-shoot": hasShooter && !disabled && !isShooter,
                        "opacity-50 bg-element text-secondary": disabled
                    })}
                    onClick={handleShoot}
                    disabled={disabled}
                />
                <PackButton 
                    text="CONFIG"
                    onClick={() => router.push(`/simulation/pack?id=${props.pack.id}`)}
                />
            </>}
        >
            <InteractivePackStatistic text="K/D" value={`${props.pack.kills} - ${props.pack.deaths}`} />
            <InteractivePackStatistic text="KDR" value={`${props.pack.kdr}`} />
            <InteractivePackStatistic text="Score" value={`${props.pack.score}`} />
        </BasePack>
    )
}



export default InteractivePack
