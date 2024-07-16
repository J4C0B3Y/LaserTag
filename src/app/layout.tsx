import type { Metadata } from "next"
import "./globals.css"
import Providers from "@/components/provider/Providers"

export const metadata: Metadata = {
    title: "Laser Tag",
    description: "Generated by create next app"
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
