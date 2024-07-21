import Container from "@/components/Container"
import { notify } from "@/components/provider/impl/NotificationProvider"
import ButtonContainer from "@/components/simulation/pack/config/button/ButtonContainer"
import ConfigButton from "@/components/simulation/pack/config/button/ConfigButton"
import NumberInput from "@/components/simulation/pack/config/input/impl/NumberInput"
import StringInput from "@/components/simulation/pack/config/input/impl/StringInput"
import type Match from "@/lib/simulation/Match"
import type Pack from "@/lib/simulation/Pack"
import { type ReactNode } from "react"

const PackConfig = (props: { pack: Pack, match: Match , onChange: () => void }) => {
    return (
        <Container header="CONFIGURATION" outer="w-full" inner="flex flex-col gap-4 p-4">
            <StringInput
                header="DISPLAY NAME"
                value={props.pack.name}
                setValue={value => {
                    props.pack.name = value
                    props.onChange()
                }}
                min={1}
                max={12}
            />

            <ConfigRow>
                <NumberInput
                    header="SCORE ADJUSTMENT"
                    value={props.pack.scoreAdjustment}
                    step={1}
                    setValue={value => {
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
                        props.pack.scoreMultiplier = value
                        props.onChange()
                    }}
                />
            </ConfigRow>

            <ButtonContainer>
                <ConfigButton
                    text="ADD KILL"
                    onClick={() => {
                        props.pack.addKill()
                        props.onChange()
                    }}
                />
                
                <ConfigButton
                    text="RESET OWN STATS"
                    onClick={() => {
                        props.pack.resetStats()
                        notify.success("Reset Pack Stats!")
                        props.onChange()
                    }}
                />

                <ConfigButton
                    text="RESET ALL STATS"
                    danger
                    onClick={() => {
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
                        props.pack.addDeath()
                        props.onChange()
                    }}
                />

                <ConfigButton
                    text="RESET OWN CONFIG"
                    onClick={() => {
                        props.pack.resetConfig()
                        notify.success("Reset Pack Config!")
                        props.onChange()
                    }}
                />

                <ConfigButton
                    text="RESET ALL CONFIG"
                    danger
                    onClick={() => {
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

const ConfigRow = (props: { children: ReactNode }) => {
    return (
        <div className="flex gap-4">
            {props.children}
        </div>
    )
}

export default PackConfig