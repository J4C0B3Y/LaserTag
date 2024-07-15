import { cn } from "@/lib/utils"

const Container = (props: { children?: React.ReactNode, inner?: string, outer?: string, dashed?: boolean, dark?: boolean, header?: string }) => {
    return (
        <span className={props.outer}>
            {props.header ? (
                <span className="font-bold uppercase text-sm pl-4 text-stone-500">{props.header}</span>
            ) : null}
            <div className={cn(
                "rounded-xl bg-stone-300 border-2 border-stone-500 p-4", 
                { "border-dashed": props.dashed },
                { "bg-stone-400": props.dark },
                props.inner
            )}>
                {props.children}
            </div>
        </span>

    )
}

export default Container