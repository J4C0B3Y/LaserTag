import Container from "@/components/Container"
import Match from "@/lib/simulation/Match"
import type MatchData from "@/lib/statistics/data/MatchData"
import { EventType } from "@/lib/statistics/data/MatchData"
import { Line } from "react-chartjs-2"

const EventsGraph = (props: { match: MatchData }) => {
    const events = props.match.events

    const hidden = {
        ticks: {
            display: false
        },
        grid: {
            drawOnChartArea: false,
            drawTicks: false
        }
    }

    return (
        <Container header="EVENTS" outer="w-[1700px]" inner="pb-0">
            <Line 
                options={{
                    elements: {
                        line: {
                            tension: 0.3
                        }
                    },
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
                    plugins: {
                        legend: {
                            position: "bottom"
                        }
                    }
                }} 
                
                data={{
                    datasets: [
                        {
                            label: "Score",
                            data: events.map(event => ({ x: event.time.toString(), y: event.score })),
                            yAxisID: "score",
                            borderColor: "#60a5fa",
                            backgroundColor: "#93c5fd"
                        },
                        {
                            label: "Kills",
                            data: events.filter(event => event.type == EventType.KILL).map((event, index) => ({ x: event.time.toString(), y: index + 1 })),
                            yAxisID: "kills",
                            borderColor: "#4ade80",
                            backgroundColor: "#86efac"
                        },
                        {
                            label: "Deaths",
                            data: events.filter(event => event.type == EventType.DEATH).map((event, index) => ({ x: event.time.toString(), y: index + 1 })),
                            yAxisID: "deaths",
                            borderColor: "#f87171",
                            backgroundColor: "#fca5a5"
                        },
                        {
                            label: `Bases ${!props.match.basesEnabled ? "(Disabled)" : ""}`,
                            data: events.filter(event => event.type == EventType.BASE).map((event, index) => ({ x: event.time.toString(), y: index + 1 })),
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