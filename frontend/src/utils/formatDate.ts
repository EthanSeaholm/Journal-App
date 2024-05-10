/**
 * A function that takes a date string as input and converts it to a more readable format.
 * 
 * @param dateString - The input date string.
 * @returns The formatted date string.
 */

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        })
}