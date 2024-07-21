
export default class Timer {
    private readonly listeners = new Array<() => void>()
    private timer!: NodeJS.Timeout

    public readonly duration: number
    public readonly interval: number

    public started!: number
    public remaining!: number    
    private _updated: number
    
    public running = false

    constructor(duration: number, interval: number) {
        this.duration = duration
        this._updated = duration
        this.remaining = duration
        this.interval = interval
    }

    public start() {
        if (this.running) return

        this.running = true
        this.started = Date.now()
        this.timer = setInterval(() => this.tick(), this.interval)
    }

    public stop() {
        if (!this.running) return

        this.running = false
        this._updated = this.tick()
        clearInterval(this.timer)
    }

    public reset() {
        this.stop()
        this._updated = this.duration
        this.start()
    }

    private tick() {
        if (!this.running) return this.remaining

        this.remaining = Math.max(0, this._updated - (Date.now() - this.started))

        if (this.remaining == 0) {
            this.finish()
        }

        return this.remaining
    }

    public onFinish(listener: () => void) {
        this.listeners.push(listener)
    }

    public get elapsed() {
        return this.duration - this.remaining
    }

    public finish() {
        this.running = false
        clearInterval(this.timer)
        this.listeners.forEach(listner => listner())
    }
}