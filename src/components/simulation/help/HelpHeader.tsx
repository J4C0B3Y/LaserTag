
const HelpHeader = (props: {
    /**
     * The header text to display in the help box.
     */
    children: string
}) => {
    return (
        <h1 className="text-center text-primary text-2xl font-semibold mt-1">
            {props.children}
        </h1>
    )
}

export default HelpHeader