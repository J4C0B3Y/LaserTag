import { cn } from "@/lib/utils/cn"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const NumberInputButton = (props: { text: string, onClick: () => void, className?: string }) => {
    return (
        <button 
            onClick={props.onClick}
            className={cn("bg-element w-8 h-full text-primary text-sm", props.className)}
        >
            {props.text}
        </button>
    )
}

export default NumberInputButton
