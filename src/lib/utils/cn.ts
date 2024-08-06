import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * The function 'cn' is a helper utility that makes it easier to handle 
 * className manipulation in a React + Tailwind environment, ensuring 
 * that classNames are appropriately merged and any conflicts are resolved, 
 * making the component styling more consistent and maintainable.
 * 
 * Desription Source: https://askides.com/articles/create-react-components-with-tailwind-like-a-pro
 * 
 * @param values The values.
 * @returns The merged className.
 */
export const cn = (...values: Array<ClassValue>) => {
    return twMerge(clsx(values))
}
