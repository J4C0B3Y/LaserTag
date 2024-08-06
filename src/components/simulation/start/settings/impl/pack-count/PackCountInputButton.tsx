import { cn } from "@/lib/utils/cn"

const PackCountInputButton = (props: { 
    /**
     * The label to display on the button.
     */
    text: string,

    /**
     * Called when the button is clicked.
     */
    onClick: () => void, 

    /**
     * The button className.
     */
    className?: string
}) => {
    return (
        <button
            className={cn("bg-element w-8 font-semibold text-primary", props.className)}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default PackCountInputButton