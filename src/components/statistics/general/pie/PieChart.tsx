import type MatchData from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"
import { Pie } from "react-chartjs-2"

const PieChart = (props: { 
    /**
     * The label to display above the pie chart.
     */
    text: string, 

    /**
     * The packs to calculate and display distributions on.
     */
    packs: Array<PackData>, 

    /**
     * The value resolver
     * 
     * @param pack The pack.
     * @returns The value.
     */
    resolver: (pack: PackData) => number 
}) => {
    return (
        <div className="flex-1 flex flex-col">
            <h1 className="absolute -z-10 -translate-y-[22px] translate-x-3 text-secondary font-bold text-sm">{props.text}</h1>
            <Pie
                className="w-full"
                data={{
                    datasets: [{
                        data: props.packs.map(pack => ({
                            name: pack.name,
                            value: props.resolver(pack)
                        }))
                    }]
                }}
            />
        </div>
    )
}

export default PieChart
