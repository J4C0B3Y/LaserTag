import Container from "@/components/Container"
import type PackData from "@/lib/statistics/data/PackData"
import { format } from "@/lib/utils/time"

const StandoutEntry = (props: { 
    /**
     * The standout label.
     */
    label: string, 

    /**
     * The standout pack and value.
     */
    data: { pack: PackData, value: number }, 

    /**
     * If the value should be formatted.
     */
    format?: boolean
}) => {
    return (
        <Container inner="bg-element text-center flex flex-col gap-3">
            <h1 className="text-primary text-2xl">
                {props.label}
            </h1>
            <h1 className="text-primary text-5xl font-semibold">
                {/* Format the value if specified in the props. */}
                {props.format ? format(props.data.value) : props.data.value}
            </h1>
            <h1 className="text-secondary text-2xl">
                {props.data.pack.name}
            </h1>
        </Container>
    )
}

export default StandoutEntry