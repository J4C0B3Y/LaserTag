"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const ConfirmationProvider = () => {
    const pathname = usePathname()

    /**
     * If the user is not on the index page, show
     * a dialog preventing them from losing data.
     */
    useEffect(() => {
        window.onbeforeunload = () => pathname != "/" || null
    }, [pathname])

    return null
}

export default ConfirmationProvider
