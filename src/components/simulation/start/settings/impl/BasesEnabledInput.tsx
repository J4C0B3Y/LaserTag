import { cn } from "@/lib/utils/cn"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const BasesEnabledInput = (props: {
    /**
     * If bases are enabled.
     */
    basesEnabled: boolean, 

    /**
     * A function to set if bases are enabled.
     * 
     * @param basesEnabled If bases are enabled.
     */
    setBasesEnabled: (basesEnabled: boolean) => void
}) => {
    return (
        <button 
            className={cn(
                "border rounded-md w-16 flex items-center p-1 transition-all bg-toggle-disabled",
                { "bg-toggle-enabled": props.basesEnabled }
            )}
            onClick={() => props.setBasesEnabled(!props.basesEnabled)}
        >
            <span className={cn("w-0 ease-in-out transition-all", { "w-full": props.basesEnabled })} />
            <div className="border h-full aspect-square rounded bg-container" />
        </button>
    )
}

export default BasesEnabledInput
