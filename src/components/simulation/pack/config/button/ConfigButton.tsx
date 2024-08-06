import { cn } from "@/lib/utils/cn"

const ConfigButton = (props: { 
    /**
     * The text to display on the button.
     */
    text: string, 

    /**
     * Called when the button is clicked.
     */
    onClick: () => void, 

    /**
     * If the button should be red.
     */
    danger?: boolean
}) => {
    return (
        <button
            className={cn(
                "border rounded-md p-2 bg-container text-primary font-semibold",
                { "bg-danger": props.danger }
            )}
            onClick={props.onClick}    
        >
            {props.text}
        </button>
    )
}

export default ConfigButton