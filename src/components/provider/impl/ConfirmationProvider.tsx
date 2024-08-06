"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

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
