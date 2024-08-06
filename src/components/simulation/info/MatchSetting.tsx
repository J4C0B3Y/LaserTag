
const MatchSetting = (props: { 
    /**
     * The label to display next to the match setting.
     */
    text: string, 

    /**
     * The match setting.
     */
    value: string
}) => {
    return (
        <div className="flex flex-col">
            <h1 className="text-secondary text-2xl italic underline">{props.text}:</h1>
            <h1 className="text-primary font-semibold text-6xl text-center">{props.value}</h1>
        </div>
    )
}

export default MatchSetting