import Container from "@/components/Container"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const ScoreEquation = (props: {
    /**
     * The equation to display.
     */
    equation: string
 }) => {
    return (
        <Container inner="text-primary font-semibold text-center text-lg">
            {props.equation}
        </Container>
    )
}

export default ScoreEquation
