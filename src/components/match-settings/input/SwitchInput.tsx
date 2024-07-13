import { cn } from "@/lib/utils"

const SwitchInput = (props: { value: boolean, setValue: (value: boolean) => void }) => {
    return (
        <button
            className={cn(
                "h-full w-16 rounded-2xl border-stone-500 border-2 p-1 flex bg-red-300",
                { "justify-end bg-green-300": props.value }
            )}
            onClick={() => props.setValue(!props.value)}
        >
            <div className={cn(
                "h-full w-5 rounded-xl border-stone-500 border-2 bg-red-400",
                { "bg-green-400": props.value }
            )} />
        </button>
    )
}

export default SwitchInput