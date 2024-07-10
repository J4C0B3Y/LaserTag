import { cn } from "@/lib/utils"

const MatchSetting = (props: { name: string, children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex justify-between mt-3", props.className)}>
            <h1 className="text-xl text-stone-600">{props.name}:</h1>
            {props.children}
        </div>
    )
}

export default MatchSetting