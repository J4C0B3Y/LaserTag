
/**
 * A millisecond accurate countdown timer
 * with pause, resume functionality.
 * 
 * Logic Inspiration:
 * https://stackoverflow.com/a/16135099
 * 
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */
export default class Timer {
    /**
     * The timer's total duration.
     */
    public readonly duration: number

    /**
     * The timer's tick interval in milliseconds.
     */
    public readonly interval: number

    /**
     * The timer's internal interval reference.
     */
    private timer!: NodeJS.Timeout

    /**
     * Listeners to be invoked when the timer finishes.
     */
    private readonly listeners = new Array<() => void>()

    /**
     * The timestamp of when the timer was last started / resumed.
     */
    private _started!: number

    /**
     * The remaining amount of milliseconds until the timer finishes.
     */
    private _remaining!: number

    /**
     * The remaining time when the timer was last stopped.
     */
    private _updated: number

    /**
     * If the timer is currently running.
     */
    private _running = false

    /**
     * Creates a new timer, preparing it to be started.
     * 
     * @param duration The total duration in milliseconds the timer should last.
     * @param interval The tick interval to update internal timer state.
     */
    public constructor(duration: number, interval: number) {
        this.duration = duration
        this.interval = interval
        this._updated = duration
        this._remaining = duration
    }

    /**
     * Starts / resumes the timer.
     */
    public start() {
        // If the timer is already running, do nothing.
        if (this._running) return

        // Mark the timer as running.
        this._running = true

        // Set started to the current timestamp.
        this._started = Date.now()

        // Create the interval that ticks the timer.
        this.timer = setInterval(() => this.tick(), this.interval)
    }

    /**
     * Stops / pauses the timer.
     */
    public stop() {
        // If the timer is already stopped, do nothing.
        if (!this._running) return

        // Mark the timer as stopped.
        this._running = false

        // Set the updated remaining time.
        this._updated = this.tick()

        // Stop the interval that ticks the timer.
        clearInterval(this.timer)
    }

    /**
     * Ticks the timer.
     * 
     * @returns The remaining time left.
     */
    private tick() {
        // If the timer is stopped, return the remaining time.
        if (!this._running) {
            return this._remaining
        }

        // Set the remaining time to the updated time minus
        // the offset from the time since the timer was started,
        // making sure remaining cannot go below zero.
        this._remaining = Math.max(0, this._updated - (Date.now() - this._started))

        // If there is no time remaining, mark the timer as finished.
        if (this._remaining == 0) {
            this.finish()
        }

        return this._remaining
    }

    /**
     * Marks the timer as finished, invoking the finish listeners.
     */
    public finish() {
        // Mark the timer as stopped.
        this._running = false

        // Stop the interval that ticks the timer.
        clearInterval(this.timer)

        // Invoke all registered finish listeners.
        this.listeners.forEach(listner => listner())
    }

    /**
     * Register a listener to be called when the timer ends.
     * 
     * @param listener The listener.
     */
    public onFinish(listener: () => void) {
        // Add the listener to the finish listener list.
        this.listeners.push(listener)
    }

    /**
     * The elapsed time since the timer started.
     */
    public get elapsed() {
        return this.duration - this._remaining
    }

    /**
     * The remaining amount of milliseconds until the timer finishes.
     */
    public get remaining() {
        return this._remaining
    }

    /**
     * If the timer is currently running.
     */
    public get running() {
        return this._running
    }
}