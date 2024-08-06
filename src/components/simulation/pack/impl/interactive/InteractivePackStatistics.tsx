
const InteractivePackStatistic = (props: { 
    /**
     * The statistic label.
     */
    text: string, 

    /**
     * The statistic value.
     */
    value: string
}) => {
    return (
        <div className="flex justify-between px-2">
            <h1 className="text-primary">{props.text}:</h1>
            <h1 className="text-primary">{props.value}</h1>
        </div>
    )
}

export default InteractivePackStatistic