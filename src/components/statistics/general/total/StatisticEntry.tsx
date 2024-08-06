
const StatisticEntry = (props: { 
    /**
     * The statistic entry label. 
     */
    text: string, 

    /**
     * The statistic entry value.
     */
    value: string | number
}) => {
    return (
        <div className="flex justify-between">
            <h1 className="text-primary text-lg">{props.text}:</h1>
            <h1 className="text-primary text-lg">{props.value}</h1>
        </div>
    )
}

export default StatisticEntry
