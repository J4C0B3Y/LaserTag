import Container from "@/components/Container"
import { notify } from "@/components/provider/impl/NotificationProvider"
import ButtonContainer from "@/components/simulation/pack/config/button/ButtonContainer"
import ConfigButton from "@/components/simulation/pack/config/button/ConfigButton"
import NumberInput from "@/components/simulation/pack/config/input/impl/number/NumberInput"
import StringInput from "@/components/simulation/pack/config/input/impl/StringInput"
import type Match from "@/lib/simulation/Match"
import type Pack from "@/lib/simulation/Pack"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const PackConfig = (props: { 
    /**
     * The pack being configured.
     */
    pack: Pack, 

    /**
     * Used to get all packs in the match.
     */
    match: Match, 

    /**
     * Called when a configuration option is changed.
     */
    onChange: () => void
 }) => {
    return (
        <Container header="CONFIGURATION" outer="w-full" inner="flex flex-col gap-4 p-4">
            <StringInput
                header="DISPLAY NAME"
                value={props.pack.name}
                setValue={value => {
                    // Change the pack name.
                    props.pack.name = value
                    props.onChange()
                }}
                min={1}
                max={12}
            />
            <div className="flex gap-4">
                <NumberInput
                    header="SCORE ADJUSTMENT"
                    value={props.pack.scoreAdjustment}
                    step={1}
                    setValue={value => {
                        // Change the pack score adjustment.
                        props.pack.scoreAdjustment = value
                        props.onChange()
                    }}
                />
                <NumberInput
                    header="SCORE MULTIPLIER"
                    value={props.pack.scoreMultiplier}
                    step={0.05}
                    min={0}
                    setValue={value => {
                        // Change the pack score multiplier.
                        props.pack.scoreMultiplier = value
                        props.onChange()
                    }}
                />
            </div>
            <ButtonContainer>
                <ConfigButton
                    text="ADD KILL"
                    onClick={() => {
                        // Add a kill to the pack.
                        props.pack.addKill()
                        props.onChange()
                    }}
                />
                <ConfigButton
                    text="RESET OWN STATS"
                    onClick={() => {
                        // Reset the pack's statistics.
                        props.pack.resetStats()
                        notify.success("Reset Pack Stats!")
                        props.onChange()
                    }}
                />
                <ConfigButton
                    text="RESET ALL STATS"
                    danger
                    onClick={() => {
                        // Reset all pack statistics.
                        for (const pack of props.match.packs) {
                            pack.resetStats()
                        }

                        notify.success("Reset Pack Stats!")
                        props.onChange()
                    }}
                />
                <ConfigButton
                    text="ADD DEATH"
                    onClick={() => {
                        // Add a death to the pack.
                        props.pack.addDeath()
                        props.onChange()
                    }}
                />
                <ConfigButton
                    text="RESET OWN CONFIG"
                    onClick={() => {
                        // Reset the pack's config.
                        props.pack.resetConfig()
                        notify.success("Reset Pack Config!")
                        props.onChange()
                    }}
                />
                <ConfigButton
                    text="RESET ALL CONFIG"
                    danger
                    onClick={() => {
                        // Reset all pack config.
                        for (const pack of props.match.packs) {
                            pack.resetConfig()
                        }

                        notify.success("Reset Pack Config!")
                        props.onChange()
                    }}
                />
            </ButtonContainer>
        </Container>
    )
}

export default PackConfig
