import Container from "@/components/Container"
import ScoreEquation from "@/components/simulation/help/score/ScoreEquation"
import ScoreOperator from "@/components/simulation/help/score/ScoreOperator"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const ScoreCalculation = () => {
    return (
        <Container outer="px-2 pt-4" inner="bg-element flex gap-1 flex-col">
            <ScoreEquation equation="KILLS × 100" />
            <ScoreOperator operator="-" />
            <ScoreEquation equation="DEATHS × 50" />
            <ScoreOperator operator="+" />
            <ScoreEquation equation="BASES × 1000" />
            <ScoreOperator operator="×" />
            <ScoreEquation equation="MULTIPLIER" />
            <ScoreOperator operator="+" />
            <ScoreEquation equation="ADJUSTMENT" />
        </Container>
    )
}

export default ScoreCalculation
