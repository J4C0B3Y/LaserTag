import type { ReactNode } from "react"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * Prevents mobile screen sizes.
 */
const ScreenSizeProvider = (props: { children: ReactNode }) => {
    return <>
        <div className="hidden lg:block w-full h-full">
            {props.children}
        </div>
        <div className="lg:hidden w-full h-full flex flex-col text-center justify-center gap-2 px-2">
            <h1 className="text-2xl text-primary">Your screen size is not supported!</h1>
            <h1 className="text-lg text-secondary">This site is not intended for mobile.</h1>
        </div>
    </>
}

export default ScreenSizeProvider