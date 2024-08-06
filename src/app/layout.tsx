import type { Metadata } from "next"
import "@/app/globals.css"
import Providers from "@/components/provider/Providers"

/**
 * Page title.
 */
export const metadata: Metadata = {
    title: "Laser Tag"
}

const RootLayout = (props: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-page h-screen w-full py-16">
                <Providers>
                    <div className="max-w-[1000px] mx-auto h-full">
                        {props.children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
