import { cn } from "@/lib/utils/cn"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * A styled button with rounded and a border.
 */
const Button = (props: { 
    /**
     * The button's text.
     */
    text: string,

    /**
     * Called when the button is clicked.
     */
    onClick?: () => void, 

    /**
     * The button className.
     */
    className?: string
}) => {
    return (
        <button 
            className={cn("rounded-md py-2 px-6 bg-element border", props.className)}
            onClick={props.onClick}
        >
            <h1 className="text-primary font-semibold text-xl pb-[2px]">{props.text}</h1>
        </button>
    )
}

export default Button
