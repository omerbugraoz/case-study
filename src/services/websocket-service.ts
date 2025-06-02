import type { WorkerToMain, TickData } from '../types/websocket'

const ForexWorker = new Worker(new URL('./forexWorker.ts', import.meta.url), {
  type: 'module',
})

type TickCallback = (tick: TickData) => void
type StatusCallback = (status: { status: string; info?: string }) => void
type ErrorCallback = (err: string) => void

export class ForexService {
  private worker: Worker
  private tickListeners: Set<TickCallback> = new Set()
  private statusListeners: Set<StatusCallback> = new Set()
  private errorListeners: Set<ErrorCallback> = new Set()

  constructor() {
    this.worker = ForexWorker as Worker

    // Worker'dan gelen mesajları handle ediyoruz
    this.worker.onmessage = (event: MessageEvent<WorkerToMain>) => {
      const message = event.data
      switch (message.type) {
        case 'tick':
          this.tickListeners.forEach((fn) => fn(message.payload))
          break
        case 'status':
          this.statusListeners.forEach((fn) => fn(message.payload))
          break
        case 'error':
          this.errorListeners.forEach((fn) => fn(message.payload.error))
          break
      }
    }

    this.worker.onerror = (e) => {
      this.errorListeners.forEach((fn) => fn(`Worker hata: ${e.message}`))
    }
  }

  //worker'a subscribe mesajı gönderiyoruz
  public subscribePairs(pairs: string[]) {
    const message = { type: 'subscribe', payload: { pairs } }
    this.worker.postMessage(message)
  }

  //worker'a unsubscribe mesajı gönderiyoruz
  public unsubscribeAll() {
    const message = { type: 'unsubscribe', payload: null }
    this.worker.postMessage(message)
  }

  //tick geldiğinde callback çağırıyoruz
  public onTick(fn: TickCallback) {
    this.tickListeners.add(fn)
  }

  //status geldiğinde callback çağırıyoruz
  public onStatus(fn: StatusCallback) {
    this.statusListeners.add(fn)
  }

  //bağlantıyı kapatıyoruz
  public disconnect() {
    this.unsubscribeAll()
  }
}
