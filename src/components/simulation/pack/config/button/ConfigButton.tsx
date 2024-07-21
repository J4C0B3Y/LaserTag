import { cn } from "@/lib/utils/cn"

const ConfigButton = (props: { text: string, onClick: () => void, danger?: boolean }) => {
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