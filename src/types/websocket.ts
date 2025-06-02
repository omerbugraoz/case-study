export interface TickData {
  symbol: string
  price: number
  volume: number
  timestamp: number // ms
}

export interface WorkerMessage<T = any> {
  type: string
  payload?: T
}

export interface TickMessage extends WorkerMessage {
  type: 'tick'
  payload: TickData
}

export interface StatusMessage extends WorkerMessage {
  type: 'status'
  payload: {
    status: 'connected' | 'disconnected' | 'error'
    info?: string
  }
}

export interface ErrorMessage extends WorkerMessage {
  type: 'error'
  payload: {
    error: string
  }
}

export interface SubscribeMessage extends WorkerMessage {
  type: 'subscribe'
  payload: { pairs: string[] }
}

export interface UnsubscribeMessage extends WorkerMessage {
  type: 'unsubscribe'
  payload?: null
}

export type MainToWorker = SubscribeMessage | UnsubscribeMessage
export type WorkerToMain = TickMessage | StatusMessage | ErrorMessage
