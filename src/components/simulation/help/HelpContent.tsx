
/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const HelpContent = (props: { 
    /**
     * The content to display in the help box.
     */
    children?: string
 }) => {
    return (
        <h1 className="text-justify text-primary text-xl p-2 my-4">
            {props.children}
        </h1>
    )
}

export default HelpContent
