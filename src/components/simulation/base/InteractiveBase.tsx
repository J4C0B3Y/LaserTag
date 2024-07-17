import Container from "@/components/Container"
import type Base from "@/lib/simulation/Base"
import { BaseColor } from "@/lib/simulation/Base"
import type Pack from "@/lib/simulation/Pack"
import { cn } from "@/lib/utils/cn"
import { DateTime } from "luxon"

const InteractiveBase = (props: {
    base: Base,
    shooter: Pack | null,
    setShooter: (pack: Pack | null) => void }
) => {
    const disabled = props.shooter == null || props.base.disabled

    const handleShoot = () => {
        props.shooter!.shootBase(props.base)
        props.setShooter(null)
    }

    return (
        <Container
            inner={cn("flex items-center justify-between", BaseBackground[props.base.color])}
            outer="w-full" 
        >   
            <h1 className="text-primary text-xl pl-1">{props.base.color}</h1>
            <button 
                className={cn(
                    "bg-container rounded-md border px-2 h-10",
                    { 
                        "bg-element text-secondary opacity-80 bg-opacity-0": disabled,
                        "opacity-0": props.shooter == null && !props.base.disabled
                    }
                )}
                onClick={handleShoot}
                disabled={disabled}
            >
                <h1 className="text-primary font-semibold">
                    {props.base.disabled ? 
                        DateTime.fromMillis(props.base.cooldown + 999).toFormat("s") + "s" :
                        "SHOOT"
                    }
                </h1>
            </button>
        </Container>
    )
}

const BaseBackground = {
    [BaseColor.RED]: "bg-base-red",
    [BaseColor.BLUE]: "bg-base-blue",
    [BaseColor.GREEN]: "bg-base-green",
    [BaseColor.YELLOW]: "bg-base-yellow"
}

export default InteractiveBase