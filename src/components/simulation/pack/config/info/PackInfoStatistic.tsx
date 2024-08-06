
/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const PackInfoStatistic = (props: { 
    /**
     * The lavel to display next to the statistic value.
     */
    text: string, 

    /**
     * The statistic value.
     */
    value: string
}) => {
    return (
        <div className="flex justify-between text-xl">
            <h1 className="text-primary">{props.text}:</h1>
            <h1 className="text-primary">{props.value}</h1>
        </div>
    )
}

export default PackInfoStatistic
