import { cn } from "@/lib/utils/cn"

const PackButton = (props: { 
    /**
     * The text to display on the button.
     */
    text: string,

    /**
     * Called when the button is clicked.
     */
    onClick?: () => void, 

    /**
     * The button className.
     */
    className?: string, 

    /**
     * If the button is disabled.
     */
    disabled?: boolean
}) => {
    return (
        <button
            className={cn("bg-container border rounded-md w-full h-10", props.className)}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <h1 className="text-primary font-semibold">{props.text}</h1>
        </button>
    )
}

export default PackButton