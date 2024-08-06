
const StatisticsEntry = (props: {
    /**
     * The value to display.
     */
    value: string | number
}) => {
    return (
        <div className="bg-element flex-1 rounded-md border-seperator border">
            <h1 className="text-primary text-center text-2xl py-4">{props.value}</h1>
        </div>
    )
}

export default StatisticsEntry
