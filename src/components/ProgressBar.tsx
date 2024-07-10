"use client"

import { AppProgressBar, NProgressOptions } from "next-nprogress-bar"

type ProgressOptions = {
	trickleRate: number;
} & NProgressOptions

const progressOptions: ProgressOptions = {
	showSpinner: false,
	trickleSpeed: 250,
	speed: 500,
	trickleRate: 0.1
}

const ProgressBar = () => {
    return (
        <AppProgressBar
            color="#78716c" // Stone 500
            height="4px"
            options={progressOptions}
        />
    )
}

export default ProgressBar