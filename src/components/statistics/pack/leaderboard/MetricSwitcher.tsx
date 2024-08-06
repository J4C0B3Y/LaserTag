import Button from "@/components/Button"
import Container from "@/components/Container"
import { Metric } from "@/lib/statistics/calculation/pack"
import type { WheelEvent } from "react"

const MetricSwitcher = (props: {
    /**
     * The current metric.
     */
    metric: Metric, 

    /**
     * The function to switch the metric.
     * @param metric 
     * @returns 
     */
    setMetric: (metric: Metric) => void
}) => {

    /**
     * Toggles between the metrics, wrapping to the 
     * opposite side if the metric is the start or end.
     * 
     * @param value The value to step by.
     */
    const step = (value: number) => {
        // A list of the metric names.
        const keys = Object.keys(Metric)

        // The current index plus the value.
        let index = keys.indexOf(props.metric) + value

        // Wrap the value if it reaches a boundary.
        if (index < 0) {
            index = keys.length -1
        } else if (index >= keys.length) {
            index = 0
        }
        
        // Set the new metric.
        props.setMetric(Metric[keys[index] as keyof typeof Metric])
    }

    /**
     * Steps the value when the continer is scrolled.
     * 
     * @param event The wheel event.
     */
    const handleWheel = (event: WheelEvent) => {
        // If the scroll deltaY is less then zero,
        // step by one else step by negative one.
        step(event.deltaY < 0 ? 1 : -1)
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

export default MetricSwitcher