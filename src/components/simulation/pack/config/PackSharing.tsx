"use client"

import Container from "@/components/Container"
import FileInput from "@/components/input/FileInput"
import { useMatch } from "@/components/provider/impl/MatchProvider"
import { notify } from "@/components/provider/impl/NotificationProvider"
import NavigationButton from "@/components/simulation/navigation/NavigationButton"
import Json from "@/lib/utils/Json"

const PackSharing = (props: { update: () => void }) => {
    const { match } = useMatch()

    const handleUpload = async (file: File) => {
        const content = await file.text()
        const config = Json.safeParse(content)

        if (config == null || !Array.isArray(config)) {
            notify.error("Invalid Packs File!")
            return
        }

        for (let i = 0; i < config.length; i++) {
            if (match.packs.length <= i) break

            const pack = match.packs[i]
            const saved = config[i]

            pack.name = saved.name
            pack.scoreMultiplier = saved.multiplier
            pack.scoreAdjustment = saved.adjustment
        }

        props.update()
        notify.success("Applied Packs File!")
    }

    const handleExport = () => {
        const packs = []

        for (const pack of match.packs) {
            packs.push({
                name: pack.name,
                multiplier: pack.scoreMultiplier,
                adjustment: pack.scoreAdjustment
            })
        }

        Json.download(packs, "packs")
    }

    const handleImport = () => {
        document.getElementsByName("upload")[0].click()
    }

    return (
        <Container header="SHARING" inner="p-4 flex flex-col gap-4">
            <FileInput 
                onFile={handleUpload} 
                inner="bg-element"
                outer="w-full h-28"
                accept="application/json"
            />

            <div className="flex gap-4 [&>*]:flex-1">
                <NavigationButton text="IMPORT" onClick={handleImport} />
                <NavigationButton text="EXPORT" onClick={handleExport} />
            </div>
        </Container>
    )

}

export default PackSharing