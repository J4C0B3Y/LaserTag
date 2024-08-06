
/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const ScoreOperator = (props: { 
    /**
     * The operator to display.
     */
    operator: string
}) => {
    return (
        <h1 className="leading-none text-secondary text-center text-lg font-semibold">
            {props.operator}
        </h1>
    )
}

export default ScoreOperator
