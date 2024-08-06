import Container from "@/components/Container"
import Match from "@/lib/simulation/Match"
import { filter } from "@/lib/statistics/calculation/general"
import type MatchData from "@/lib/statistics/data/MatchData"
import { EventType, type MatchEvent } from "@/lib/statistics/data/MatchData"
import { Line } from "react-chartjs-2"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const EventsGraph = (props: {
    /**
     * The match data to display.
     */
    match: MatchData
}) => {

    /**
     * Common graph styling to remove ticks and grid lines.
     */
    const hidden = {
        ticks: {
            display: false
        },
        grid: {
            drawOnChartArea: false,
            drawTicks: false
        }
    }

    /**
     * Converts an event and event index to a point on the graph.
     * 
     * @param event The match event.
     * @param index The event index.
     * @returns The point object.
     */
    const point = (event: MatchEvent, index: number) => {
        return { x: event.time.toString(), y: index + 1 }
    }

    return (
        <Container header="EVENTS" outer="w-[1700px]" inner="pb-0">
            <Line 
                options={{
                    elements: { line: { tension: 0.5 } }, // Smooth line transitions.
                    scales: {
                        x: {
                            beginAtZero: true,
                            suggestedMax: Match.DURATION,
                            ...hidden 
                        },
                        score: {
                            ...hidden,
                            grid: {
                                drawOnChartArea: true,
                                drawTicks: false
                            }
                        },
                        kills: hidden,
                        deaths: hidden,
                        bases: hidden
                    },
                    plugins: { legend: { position: "bottom" } } // Move legend to the bottom.
                }} 
                
                data={{
                    datasets: [
                        {
                            label: "Score",
                            data: props.match.events.map(event => ({ x: event.time.toString(), y: event.score })),
                            yAxisID: "score",
                            borderColor: "#60a5fa",
                            backgroundColor: "#93c5fd"
                        },
                        {
                            label: "Kills",
                            data: filter(props.match, EventType.KILL).map(point),
                            yAxisID: "kills",
                            borderColor: "#4ade80",
                            backgroundColor: "#86efac"
                        },
                        {
                            label: "Deaths",
                            data: filter(props.match, EventType.DEATH).map(point),
                            yAxisID: "deaths",
                            borderColor: "#f87171",
                            backgroundColor: "#fca5a5"
                        },
                        {
                            label: `Bases ${!props.match.basesEnabled ? "(Disabled)" : ""}`,
                            data: filter(props.match, EventType.BASE).map(point),
                            yAxisID: "bases",
                            borderColor: "#e879f9",
                            backgroundColor: "#f0abfc"
                        }
                    ]
                }}
            />
        </Container>
    )
}

export default EventsGraph
