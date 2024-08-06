import Container from "@/components/Container"
import MatchSetting from "@/components/simulation/info/MatchSetting"
import type Match from "@/lib/simulation/Match"
import { TeamSize } from "@/lib/simulation/Match"
import { DateTime } from "luxon"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const SimulationInfo = (props: { 
    /**
     * The match to display infomation on.
     */
    match: Match
}) => {
    return (
        <div className="flex px-8 items-center">
            <Container header="TIME LEFT" inner="rounded-r-none w-[493px]" outer="w-[1250px] overflow-hidden">
                <h1 className="text-center text-primary font-bold text-9xl mb-4">
                    {DateTime.fromMillis(props.match.timer.remaining + (props.match.finished ? 0 : 1000)).toFormat("mm:ss")}
                </h1>
            </Container>
            <Container header="MATCH INFO" inner="py-4 px-6" outer="w-full">
                <MatchSetting text="Team Size" value={TeamSize[props.match.teamSize]} />
                <MatchSetting text="Total Packs" value={props.match.packs.length.toString()} />
            </Container>
        </div>
    )
}



export default SimulationInfo
