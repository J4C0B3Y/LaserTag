import ProgressBar from "@/components/provider/impl/ProgressBar"
import GameDataProvider from "@/components/provider/impl/MatchDataProvider"
import MatchProvider from "@/components/provider/impl/MatchProvider"
import NotificationProvider from "@/components/provider/impl/NotificationProvider"
import ConfirmationProvider from "@/components/provider/impl/ConfirmationProvider"
import ScreenSizeProvider from "@/components/provider/impl/ScreenSizeProvider"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const Providers = (props: { 
    /**
     * The layout content displayed on the page.
     */
    children: React.ReactNode
}) => {
    return (
        <GameDataProvider>
            <MatchProvider>
                <ProgressBar />
                <ScreenSizeProvider>
                    {props.children}
                </ScreenSizeProvider>
                <ConfirmationProvider />
                <NotificationProvider />
            </MatchProvider>
        </GameDataProvider>
    )
}

export default Providers
