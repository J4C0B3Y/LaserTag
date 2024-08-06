
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
