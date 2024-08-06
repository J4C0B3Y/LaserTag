import type MatchData from "@/lib/statistics/data/MatchData"
import type { EventType } from "@/lib/statistics/data/MatchData"
import type PackData from "@/lib/statistics/data/PackData"
import { average } from "@/lib/utils/math"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

/**
 * Returns the events from a pack or match filtered by an event type,
 * if no event type is provided, all events will be returned.
 * 
 * @param data The match or pack data.
 * @param type The event type. 
 * @returns The filtered events.
 */
export const filter = (data: PackData | MatchData, type?: EventType) => {
    return data.events.filter(event => type == undefined || event.type == type)
}

/**
 * Returns the amount of events from a pack or match filtered by an event type,
 * if no event type is provided, the amount of all events will be returned.
 * 
 * @param data The match or pack data.
 * @param type The event type.
 * @returns The amount of the filtered events.
 */
export const amount = (data: PackData | MatchData, type?: EventType) => {
    return filter(data, type).length
}

/**
 * Calculates the average time between events filtered by an event type,
 * if no event type is provided, all events will be used for the calculation.
 * 
 * @param data The match or pack data.
 * @param type The event type.
 * @returns The average time between events.
 */
export const between = (data: PackData | MatchData, type?: EventType) => {
    const events = filter(data, type)
    const values = new Array<number>()

    for (let i = 0; i < events.length - 1; i++) {
        // Calculate the time between each two consecutive events.
        values.push(events[i + 1].time - events[i].time)
    }

    return average(values)
}

/**
 * Sorts a list of packs into a 2d array of packs,
 * each entry representing a different team.
 * 
 * @param packs The list of packs.
 * @returns The 2d pack team array.
 */
export const teams = (packs: Array<PackData>) => {
    const teams = new Map<number, Array<PackData>>()

    for (const pack of packs) {
        // If the teams map doesnt contain the packs team,
        // Set the packs team to a new list to add packs to.
        if (!teams.has(pack.team)) {
            teams.set(pack.team, new Array())
        }

        // Get the array in the teams map using the packs 
        // team id, then insert the pack into the array.
        teams.get(pack.team)!.push(pack)
    }

    // Ignoring the team ids, return the 2d array.
    return Array.from(teams.values())
}

/**
 * Calculates the highest consecutive amount of a certain event type.
 * 
 * @param pack The pack.
 * @param type The event type.
 * @returns The highest multi-event streak.
 */
export const multi = (pack: PackData, type: EventType) => {
    let current = 0, highest = 0

    for (const event of pack.events) {
        // If the event type is the target type, 
        // increment current, else set it back to 0.
        current = event.type == type ? current + 1 : 0

        // If the current value is greater then the highest
        // value, highest should be set to current.
        highest = current > highest ? current : highest
    }

    return highest
}

/**
 * Utility functions to filter values.
 */
export const Filter = {
    ALL: (value: number) => true,
    NON_ZERO: (value: number) => value != 0
}

/**
 * Utility functions to sort values.
 */
export const Comparator = {
    ASCENDING: (first: number, second: number) => second - first,
    DESCENDING: (first: number, second: number) => first - second
}
