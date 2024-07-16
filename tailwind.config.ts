import type { Config } from "tailwindcss"
import color from "tailwindcss/colors"

const config: Config = {
    content: [
        "./src/components/**/*.{ts,tsx}",
        "./src/app/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: color.stone[500],
                element: color.stone[200],
                container: color.stone[500],
                background: color.stone[200],
                text: {
                    primary: color.stone[700],
                    secondary: color.stone[500]
                }
            }
        }
    }
}

export default config
