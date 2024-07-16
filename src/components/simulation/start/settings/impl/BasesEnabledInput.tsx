import { cn } from "@/lib/utils/cn"

const BasesEnabledInput = (props: { value: boolean, setValue: (value: boolean) => void }) => {
    return (
        <button 
            className={cn(
                "border rounded-md w-16 flex items-center p-1 transition-all bg-toggle-disabled",
                { "bg-toggle-enabled": props.value }
            )}
            onClick={() => props.setValue(!props.value)}
        >
            <span className={cn("w-0 ease-in-out transition-all", { "w-full": props.value })} />
            <div className="border h-full aspect-square rounded bg-container" />
        </button>
    )
}

export default BasesEnabledInput