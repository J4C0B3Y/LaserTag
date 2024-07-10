import { GameDataProvider } from "@/components/provider/impl/GameDataProvider"
import { MatchProvider } from "@/components/provider/impl/MatchProvider"

const Providers = (props: { children: React.ReactNode }) => {
    return (
        <GameDataProvider>
            <MatchProvider>
                {props.children}
            </MatchProvider>
        </GameDataProvider>
    )
}

export default Providers