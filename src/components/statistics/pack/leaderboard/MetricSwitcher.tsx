import Button from "@/components/Button"
import Container from "@/components/Container"
import { filter } from "@/lib/statistics/calculation/GeneralCalculations"
import { EventType } from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"
import type { WheelEvent } from "react"

const MetricSwitcher = (props: { metric: Metric, setMetric: (metric: Metric) => void }) => {
    const step = (value: number) => {
        const keys = Object.keys(Metric)
        let index = keys.indexOf(props.metric) + value

        if (index < 0) {
            index = keys.length -1
        } else if (index >= keys.length) {
            index = 0
        }
        
        props.setMetric(Metric[keys[index] as keyof typeof Metric])
    }

    const handleWheel = (event: WheelEvent) => {
        step(event.deltaY > 0 ? 1 : -1)
    }

    return (
        <Container header="METRIC" outer="h-full" inner="flex gap-2" onWheel={handleWheel}>
            <Button text="<" onClick={() => step(-1)} />
            <Container
                inner="bg-element rounded-md flex items-center justify-center"
                outer="w-full"
            >
                <h1 className="text-primary text-2xl font-semibold">
                    {props.metric}
                </h1>
            </Container>
            <Button text=">" onClick={() => step(1)} />
        </Container>
    )
}

export enum Metric {
    SCORE = "SCORE",
    KILLS = "KILLS",
    DEATHS = "DEATHS",
    BASES = "BASES"
}

export const MetricResolver = {
    [Metric.SCORE]: (pack: PackData) => pack.score,
    [Metric.KILLS]: (pack: PackData) => filter(pack, EventType.KILL).length,
    [Metric.DEATHS]: (pack: PackData) => filter(pack, EventType.DEATH).length,
    [Metric.BASES]: (pack: PackData) => filter(pack, EventType.BASE).length
}

export default MetricSwitcher