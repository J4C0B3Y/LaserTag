import ProgressBar from "@/components/provider/impl/ProgressBar"
import GameDataProvider from "@/components/provider/impl/GameDataProvider"
import MatchProvider from "@/components/provider/impl/MatchProvider"
import NotificationProvider from "@/components/provider/impl/NotificationProvider"
import ConfirmationProvider from "@/components/provider/impl/ConfirmationProvider"

const Providers = (props: { children: React.ReactNode }) => {
    return (
        <GameDataProvider>
            <MatchProvider>
                <ProgressBar />
                {props.children}
                <ConfirmationProvider />
                <NotificationProvider />
            </MatchProvider>
        </GameDataProvider>
    )
}

export default Providers