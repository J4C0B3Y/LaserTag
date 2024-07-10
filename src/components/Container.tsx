import { cn } from "@/lib/utils"

const Container = (props: { children?: React.ReactNode, className?: string, dashed?: boolean }) => {
    return (
        <div className={cn(
            "rounded-xl bg-stone-300 border-2 border-stone-500 p-4", 
            { "border-dashed": props.dashed },
            props.className
        )}>
            {props.children}
        </div>
    )
}

export default Container