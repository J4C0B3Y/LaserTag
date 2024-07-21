import { cn } from "@/lib/utils/cn"

const NavigationButton = (props: { text: string, onClick?: () => void, className?: string }) => {
    return (
        <button 
            className={cn("rounded-md py-2 px-6 bg-element border", props.className)}
            onClick={props.onClick}
        >
            <h1 className="text-primary font-semibold text-xl pb-[2px]">{props.text}</h1>
        </button>
    )
}

export default NavigationButton