import { cn } from "@/lib/utils"
import Link from "next/link"

const NavigationButton = (props: { text: string, onClick: () => void, red?: boolean }) => {
    return (
        <button
            className={cn(
                "rounded-xl border-2 border-stone-500 bg-stone-300 py-2 px-8 font-semibold text-stone-700 text-lg",
                { "bg-red-300": props.red }
            )}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default NavigationButton