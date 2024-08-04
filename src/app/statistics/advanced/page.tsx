"use client"

import Container from "@/components/Container"
import { useMatchData } from "@/components/provider/impl/MatchDataProvider"
import { calculate, filter, format, ratio, time } from "@/lib/statistics/advanced/Statistics"
import { EventType } from "@/lib/statistics/data/MatchData"


const AdvancedStatistics = () => {
    const { data } = useMatchData()
    const packs = data.packs

    const [packScore, teamScore] = calculate(packs, pack => pack.score)
    const [packKills, teamKills] = calculate(packs, pack => filter(pack, EventType.KILL).length)
    const [packDeaths, teamDeaths] = calculate(packs, pack => filter(pack, EventType.DEATH).length, undefined, (a, b) => a - b)
    const [packBases, teamBases] = calculate(packs, pack => filter(pack, EventType.BASE).length)
    const [packKDR, teamKDR] = calculate(packs, pack => ratio(filter(pack, EventType.KILL).length, filter(pack, EventType.DEATH).length))
    const [packActivity, teamActivity] = calculate(packs, pack => time(pack), value => value != 0, (a, b) => a - b)
    const [packTPK, teamTPK] = calculate(packs, pack => time(pack, EventType.KILL), value => value != 0, (a, b) => a - b)
    const [packTPD, teamTPD] = calculate(packs, pack => time(pack, EventType.DEATH), value => value != 0, (a, b) => a - b)
    const [packTPB, teamTPB] = calculate(packs, pack => time(pack, EventType.BASE), value => value != 0, (a, b) => a - b)
    const [packTPKDR, teamTPKDR] = calculate(packs, pack => ratio(time(pack, EventType.KILL) / 1000, time(pack, EventType.DEATH) / 1000), value => value != 0, (a, b) => a - b)

    
    return (
        <div className="flex gap-4 [&>*]:flex-1">
            <Container header="AVERAGES" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="Score"
                    pack={packScore}
                    team={teamScore}
                />
                <StatisticsRow
                    statistic="Kills"
                    pack={packKills}
                    team={teamKills}
                />
                <StatisticsRow
                    statistic="Deaths"
                    pack={packDeaths}
                    team={teamDeaths}
                />
                <StatisticsRow
                    statistic="Bases"
                    pack={packBases}
                    team={teamBases}
                />
                <StatisticsRow
                    statistic="KDR"
                    pack={packKDR}
                    team={teamKDR}
                />
            </Container>
            <Container header="&nbsp;" inner="flex flex-col gap-2">
                <StatisticsHeader />
                <StatisticsRow
                    statistic="Activity"
                    pack={format(packActivity)}
                    team={format(teamActivity)}
                />
                <StatisticsRow
                    statistic="TPK"
                    pack={format(packTPK)}
                    team={format(teamTPK)}
                />
                <StatisticsRow
                    statistic="TPD"
                    pack={format(packTPD)}
                    team={format(teamTPD)}
                />
                <StatisticsRow
                    statistic="TPB"
                    pack={format(packTPB)}
                    team={format(teamTPB)}
                />
                <StatisticsRow
                    statistic="TPKDR"
                    pack={packTPKDR}
                    team={teamTPKDR}
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

const StatisticsRow = (props: { statistic: string, pack: string | number, team: string | number }) => {
    return (
        <div className="flex gap-2">
            <StatisticsEntry value={props.statistic} />
            <StatisticsEntry value={props.pack} />
            <StatisticsEntry value={props.team} />
        </div>
    )
}

const StatisticsEntry = (props: {value: string | number }) => {
    return (
        <div className="bg-element flex-1 rounded-md border-seperator border">
            <h1 className="text-primary text-center text-2xl py-4">{props.value}</h1>
        </div>
    )
}

export default AdvancedStatistics