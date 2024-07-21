import Container from "@/components/Container"

const ScoreCalculation = () => {
    return (
        <Container outer="px-2 pt-4" inner="bg-element flex gap-2 flex-col">
            <Equation text="KILLS × 100" />
            <Operator text="-" />
            <Equation text="DEATHS × 50" />
            <Operator text="+" />
            <Equation text="BASES × 1000" />
            <Operator text="×" />
            <Equation text="MULTIPLIER" />
            <Operator text="+" />
            <Equation text="ADJUSTMENT" />
        </Container>
    )
}

const Equation = (props: { text: string }) => {
    return (
        <Container inner="text-primary font-semibold text-center text-lg">
            {props.text}
        </Container>
    )
}

const Operator = (props: { text: string }) => {
    return (
        <h1 className="leading-none text-primary text-center text-sm font-semibold">
            {props.text}
        </h1>
    )
}

export default ScoreCalculation