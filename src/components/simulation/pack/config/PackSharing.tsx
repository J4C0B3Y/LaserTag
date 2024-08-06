"use client"

import Container from "@/components/Container"
import FileInput from "@/components/input/FileInput"
import { notify } from "@/components/provider/impl/NotificationProvider"
import Button from "@/components/Button"
import { parse, download } from "@/lib/utils/json"
import { useCooldown } from "@/lib/utils/cooldown"
import type Match from "@/lib/simulation/Match"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const PackSharing = (props: { 
    /**
     * Called when a pack file is imported.
     */
    onImport: () => void,

    /**
     * The match to import and export packs from.
     */
    match: Match
}) => {
    /**
     * Exports and downloads the match's pack configuration.
     */
    const handleExport = useCooldown("downloading", 1000 * 3, () => {
        const packs = []

        // Save only the configuration options of each pack.
        for (const pack of props.match.packs) {
            packs.push({
                name: pack.name,
                multiplier: pack.scoreMultiplier,
                adjustment: pack.scoreAdjustment
            })
        }

        // Download the result.
        download(packs, "packs")
        notify.success("Downloaded Packs File!")
    })

    /**
     * Imports a pack file configuration.
     * 
     * @param file The file.
     */
    const handleUpload = async (file: File) => {
        // Read the content of the file.
        const content = await file.text()

        // Parse the result into json.
        const config = parse(content)

        // If the result is invalid or not an array, return.
        if (config == null || !Array.isArray(config)) {
            notify.error("Invalid Packs File!")
            return
        }

        // For each entry in the pack config json, set the 
        // config of the corresponding pack in the match.
        for (let i = 0; i < config.length; i++) {
            // If the index of the json pack is greater then 
            // the highest index allowed in the match, break.
            if (props.match.packs.length <= i) break

            const pack = props.match.packs[i]
            const saved = config[i]

            pack.name = saved.name
            pack.scoreMultiplier = saved.multiplier
            pack.scoreAdjustment = saved.adjustment
        }

        // Invoke the on import callback.
        props.onImport()
        notify.success("Applied Packs File!")
    }

    /**
     * Click the file input, triggering the upload window.
     */
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
                <Button text="IMPORT" onClick={handleImport} />
                <Button text="EXPORT" onClick={handleExport} />
            </div>
        </Container>
    )
}

export default PackSharing
