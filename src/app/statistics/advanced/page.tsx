"use client"

import Container from "@/components/Container"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { EventType } from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"

const average = (values: Array<number>) => {
    return values.reduce((previous, current) => previous + current) / values.length
}

const time = (pack: PackData, type: EventType) => {
    const events = pack.events.filter(pack => pack.type = type)
    
    if (events.length < 2) {
        return 0
    }

    let sum = 0

    for (let i = 0; i < events.length-1; i++) {
        sum += events[i + 1].time - events[i].time
    }

    return sum / events.length
}

const AdvancedStatistics = () => {
    const { data } = useMatchData()
    const packs = data.packs

    const team = (
        value: (pack: PackData) => number,
        comparetor: (x: number, y: number) => boolean,
        filter: (value: number) => boolean
    ) => {
        const teams = new Map<number, Array<PackData>>()

        for (const pack of packs) {
            if (!teams.has(pack.team)) {
                teams.set(pack.team, new Array())
            }

            teams.get(pack.team)!.push(pack)
        }

        let current = 0

        for (const packs of Array.from(teams.values())) {
            const teamAverage = average(packs.map(value))
            console.log(teamAverage)

            if (filter(teamAverage) && comparetor(teamAverage, current)) {
                current = teamAverage
            }
        }

        return current
    }

    const calculate = (
        value: (pack: PackData) => number, 
        comparetor = (x: number, y: number) => x > y,
        filter = (value: number) => true
    ) => {
        return [
            round(average(packs.map(value))),
            round(team(value, comparetor, filter))
        ]
    }

    const round = (value: number) => {
        return (Math.round(value * 100) / 100).toString()
    }

    const format = (value: string) => {
        return `${Math.round(Number(value) / 10) / 100}s`
    }

    const filter = (pack: PackData, type: EventType) => {
        return pack.events.filter(event => event.type == type)
    }

    const [playerScore, teamScore] = calculate(pack => pack.score)
    const [playerKills, teamKills] = calculate(pack => filter(pack, EventType.KILL).length)
    const [playerDeaths, teamDeaths] = calculate(
        pack => filter(pack, EventType.DEATH).length,
        (x, y) => x < y
    )
    const [playerBases, teamBases] = calculate(pack => filter(pack, EventType.BASE).length)

    const [playerTPK, teamTPK] = calculate(pack => 
        time(pack, EventType.KILL),
        (x, y) => x > y,
        value => value != 0
    )

    // const [playerTPD, teamTPD] = calculate(pack => 
    //     time(pack, EventType.DEATH),
    //     (x, y) => x < y,
    //     value => value != 0
    // )

    return (
        <div className="flex gap-4 [&>*]:flex-1">
            <Container header="AVERAGES" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="Score"
                    player={playerScore}
                    team={teamScore}
                />
                <StatisticsRow
                    statistic="Kills"
                    player={playerKills}
                    team={teamKills}
                />
                <StatisticsRow
                    statistic="Deaths"
                    player={playerDeaths}
                    team={teamDeaths}
                />
                <StatisticsRow
                    statistic="Bases"
                    player={playerBases}
                    team={teamBases}
                />
                <StatisticsRow
                    statistic="TPK"
                    player={format(playerTPK)}
                    team={format(teamTPK)}
                />
                {/* <StatisticsRow
                    statistic="TPD"
                    player={format(playerTPD)}
                    team={format(teamTPD)}
                /> */}
            </Container>
            <Container header="&nbsp;" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="KDR"
                    player={round(Number(playerKills) / Number(playerDeaths))}
                    team={round(Number(teamKills) / Number(teamDeaths))}
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