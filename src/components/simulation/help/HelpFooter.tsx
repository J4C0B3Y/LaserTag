
const HelpFooter = (props: { 
    /**
     * The footer text to display in the help box.
     */
    children: string
}) => {
    return (
        <h1 className="text-center text-primary text-xl font-semibold mt-4">
            {props.children}
        </h1>
    )
}

export default HelpFooter
