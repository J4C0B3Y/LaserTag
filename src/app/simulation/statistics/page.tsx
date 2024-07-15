"use client"

import { useMatch } from "@/components/provider/impl/MatchProvider"

const Statistics = () => {
    const { match } = useMatch()

    return <button onClick={() => match.end()}>
        e
    </button>
}

export default Statistics