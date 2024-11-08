import type { Config } from "tailwindcss"
import color from "tailwindcss/colors"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * The color theme to use for the site.
 */
const theme = color.stone

const config: Config = {
    content: [
        "./src/components/**/*.{ts,tsx}",
        "./src/app/**/*.{ts,tsx}"
    ],
    theme: {
        borderWidth: {
            DEFAULT: "2px"
        },
        borderColor: {
            DEFAULT: theme[500],
            seperator: theme[400]
        },
        textColor: {
            primary: theme[700],
            secondary: theme[500]
        },
        backgroundColor: {
            page: theme[200],
            container: theme[300],
            element: theme[200],
            toggle: {
                enabled: color.green[300],
                disabled: color.red[300]
            },
            quit: color.red[300],
            shoot: color.red[300],
            base: {
                red: color.red[300],
                blue: color.blue[300],
                green: color.green[300],
                yellow: color.yellow[200]
            },
            invalid: color.red[200],
            danger: color.red[200],
            selected: theme[100]
        },
        colors: {
            progress: theme[500],
            notification: theme[300]
        }
    }
}

export default config
