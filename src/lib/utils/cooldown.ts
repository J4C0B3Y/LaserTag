import { notify } from "@/components/provider/impl/NotificationProvider"
import { format } from "@/lib/utils/time"
import { useState } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * Creates a cooldown, which only invokes a 
 * trigger callback when no cooldown is active.
 * 
 * @param action The action name.
 * @param cooldown The cooldown in milliseconds.
 * @param trigger The trigger callback.
 * @returns The function to activate the cooldown.
 */
export const useCooldown = (action: string, cooldown: number, trigger: () => void) => {
    const [last, setLast] = useState(0)

    return () => {
        // Calculates the remaining cooldown time by adding
        // the last time the trigger was called and the cooldown
        // duration then subtracting the current timestamp.
        const remaining = last + cooldown - Date.now()

        // If there is an active cooldown, send a notification and return.
        if (remaining > 0) {
            notify.error(`Please wait ${format(remaining)} before ${action} again!`)
            return
        }

        // Sets the last invoked timestamp to the current time. 
        setLast(Date.now())

        // Invokes the trigger callback.
        trigger()
    }
}
