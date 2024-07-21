"use client"

import Container from "@/components/Container"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import type Pack from "@/lib/simulation/Pack"
import { EventType } from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"

const AdvancedStatistics = () => {
    const { data } = useMatchData()

    const packs = data.packs

    const average = (values: Array<number>) => {
        return values.reduce((previous, current) => previous + current) / values.length
    }

    const averageTopTeam = () => {

    }

    const calculate = (value: (pack: PackData) => number) => {
        return [
            format(average(packs.map(value)))
        ]
    }

    const format = (value: number) => {
        return (Math.round(value * 100) / 100).toString()
    }

    const filter = (pack: PackData, type: EventType) => {
        return pack.events.filter(event => event.type == type)
    }

    const [playerScore, teamScore] = calculate(pack => pack.score)
    const [playerKills, teamKills] = calculate(pack => filter(pack, EventType.KILL).length)
    const [playerDeaths, teamDeaths] = calculate(pack => filter(pack, EventType.DEATH).length)
    const [playerBases, teamBases] = calculate(pack => filter(pack, EventType.BASE).length)

    const [playerTPK, teamTPK] = calculate(pack => 
        0
    )

    return (
        <div className="flex gap-4 [&>*]:flex-1">
            <Container header="AVERAGES" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="Score"
                    player={playerScore}
                    team=""
                />
                <StatisticsRow
                    statistic="Kills"
                    player={playerKills}
                    team=""
                />
                <StatisticsRow
                    statistic="Deaths"
                    player={playerDeaths}
                    team=""
                />
                <StatisticsRow
                    statistic="Bases"
                    player={playerBases}
                    team=""
                />
                <StatisticsRow
                    statistic="TPK"
                    player=""
                    team=""
                />
                <StatisticsRow
                    statistic="TPD"
                    player=""
                    team=""
                />
            </Container>
            <Container header="&nbsp;" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="KDR"
                    player=""
                    team=""
                />
                <StatisticsRow
                    statistic="TPKDR"
                    player=""
                    team=""
                />
            </Container>
        </div>
    )
}

const StatisticsHeader = () => {
    return (
        <div className="flex text-secondary text-sm font-semibold [&>*]:flex-1 text-center">
            <h1>STATISTIC</h1>
            <h1>PLAYER</h1>
            <h1>TOP TEAM</h1>
        </div>
    )
}

const StatisticsRow = (props: { statistic: string, player: string, team: string }) => {
    return (
        <div className="flex gap-2">
            <StatisticsEntry text={props.statistic} />
            <StatisticsEntry text={props.player} />
            <StatisticsEntry text={props.team} />
        </div>
    )
}

const StatisticsEntry = (props: { text: string }) => {
    return (
        <div className="bg-element flex-1 rounded-md border-seperator border">
            <h1 className="text-primary text-center text-2xl py-4">{props.text}</h1>
        </div>
    )
}

export default AdvancedStatistics