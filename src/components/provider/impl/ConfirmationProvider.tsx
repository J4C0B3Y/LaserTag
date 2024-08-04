"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

const ConfirmationProvider = () => {
    const pathname = usePathname()

    useEffect(() => {
        window.onbeforeunload = () => pathname != "/" || null
    }, [pathname])

    return null
}

export default ConfirmationProvider