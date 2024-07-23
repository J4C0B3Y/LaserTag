import type MatchData from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"
import { Line } from "react-chartjs-2"

const EventsGraph = (props: { match: MatchData }) => {
    const events = props.match.events

    return (
        <Line 
            options={{
                elements: {
                    line: {
                        tension: 0.3
                    }
                }
            }} 
            
            data={{
            
            datasets: [
                {
                    label: "Score",
                    data: events.map(event => ({ x: event.time.toString(), y: event.score }))
                }
            ]
        }}/>
    )
}

export default EventsGraph