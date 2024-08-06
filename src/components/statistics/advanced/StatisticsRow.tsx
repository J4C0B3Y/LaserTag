import StatisticsEntry from "@/components/statistics/advanced/StatisticsEntry"
import { format } from "@/lib/utils/time"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const StatisticsRow = (props: {
    /**
     * The statistic label.
     */
    statistic: string,

    /**
     * The statistics values.
     */
    values: { pack: number, team: number }, 

    /**
     * If the value should be formatted.
     */
    format?: boolean
}) => {
    return (
        <div className="flex gap-2">
            <StatisticsEntry value={props.statistic} />
            <StatisticsEntry value={props.format ? format(props.values.pack) : props.values.pack} />
            <StatisticsEntry value={props.format ? format(props.values.team) : props.values.team} />
        </div>
    )
}

export default StatisticsRow
