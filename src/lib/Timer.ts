
export default class Timer {
    public running = false

    public readonly duration: number
    public readonly interval: number
    public remaining!: number
    private _remaining: number
    public started!: number
    
    private timer!: NodeJS.Timeout

    private readonly listeners: TimerListeners = {
        START: [], STOP: [], TICK: [], FINISH: []
    }

    constructor(duration: number, interval: number) {
        this.duration = duration
        this._remaining = duration
        this.remaining = duration
        this.interval = interval
    }

    public start() {
        if (this.running) return

        this.running = true
        this.started = Date.now()
        this.timer = setInterval(() => this.tick(), this.interval)
        this.listeners.START.forEach(_ => _())
    }

    public stop() {
        if (!this.running) return

        this.running = false
        this._remaining = this.tick()
        clearInterval(this.timer)
        this.listeners.STOP.forEach(_ => _())
    }

    public reset() {
        this.stop()
        this._remaining = this.duration
        this.start()
    }

    private tick() {
        if (!this.running) return this.remaining

        this.remaining = Math.max(0, this._remaining - (Date.now() - this.started))
        this.listeners.TICK.forEach(_ => _())

        if (this._remaining == 0) {
            this.finish()
        }

        return this.remaining
    }

    public on(event: TimerEvent, listener: () => void) {
        this.listeners[event].push(listener)
    }

    public get elapsed() {
        return this.duration - this.remaining
    }

    public finish() {
        this.running = false
        clearInterval(this.timer)
        this.listeners.FINISH.forEach(_ => _())
    }
}

export type TimerListeners = {
    [key in TimerEvent]: Array<() => void>
}

export enum TimerEvent {
    START="START",
    STOP="STOP",
    TICK="TICK",
    FINISH="FINISH"
}