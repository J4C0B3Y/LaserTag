import { notify } from "@/components/provider/impl/NotificationProvider"
import { useState } from "react"
import { format } from "./time"

export const useCooldown = (action: string, cooldown: number, trigger: () => void) => {
    const [last, setLast] = useState(0)

    return () => {
        const remaining = last + cooldown - Date.now()

        if (remaining > 0) {
            notify.error(`Please wait ${format(remaining)} before ${action} again!`)
            return
        }

        setLast(Date.now())
        trigger()
    }
}
