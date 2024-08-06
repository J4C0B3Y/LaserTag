"use client"

import { AppProgressBar, NProgressOptions } from "next-nprogress-bar"

/**
 * The next-nprogress-bar library forgot to put
 * trickleRate in their option type, so I have to
 * make my own type so typescript doesnt complain.
 */
type ProgressOptions = {
	trickleRate: number;
} & NProgressOptions

/**
 * The configuration options for the progress bar.
 */
const options: ProgressOptions = {
	showSpinner: false,
	trickleSpeed: 250,
	speed: 500,
	trickleRate: 0.1
}

const ProgressBar = () => {
    return (
        <AppProgressBar
            color="var(--progress-color)"
            height="4px"
            options={options}
        />
    )
}

export default ProgressBar