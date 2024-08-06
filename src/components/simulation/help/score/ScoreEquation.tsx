import Container from "@/components/Container"

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