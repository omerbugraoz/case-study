/// <reference lib="webworker" />
import { parseFinnhubMessage } from '../utils/validation'
import type { TickData, MainToWorker, TickMessage, StatusMessage, ErrorMessage } from '../types/websocket'

let ws: WebSocket | null = null
let subscribedPairs: string[] = []
let rateLimitInterval: number = 1000
let buffer: Record<string, TickData> = {}

let messageCount = 0
let errorCount = 0
let reconnectAttempts = 0
let isManuallyClosed = false

const postStatus = (status: 'connected' | 'disconnected' | 'error', info?: string) => {
  const message: StatusMessage = { type: 'status', payload: { status, info } }
  ;(self as any).postMessage(message)
}

const postError = (error: string) => {
  const message: ErrorMessage = { type: 'error', payload: { error: error } }
  ;(self as any).postMessage(message)
}

const postTick = (tick: TickData) => {
  const message: TickMessage = { type: 'tick', payload: tick }
  ;(self as any).postMessage(message)
}

const connectWebSocket = () => {
  if (ws) return
  isManuallyClosed = false
  const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY as string
  const url = `wss://ws.finnhub.io?token=${API_KEY}`
  ws = new WebSocket(url)

  ws.onopen = () => {
    postStatus('connected', 'WebSocket açıldı')
    reconnectAttempts = 0

    subscribedPairs.forEach((symbol) => {
      ws?.send(JSON.stringify({ type: 'subscribe', symbol }))
    })
  }

  ws.onmessage = (event) => {
    messageCount++
    const ticks = parseFinnhubMessage(event.data)
    if (ticks.length === 0) return

    ticks.forEach((t) => {
      buffer[t.symbol] = t
    })
  }

  const bufferInterval = setInterval(() => {
    Object.values(buffer).forEach((tick) => {
      postTick(tick)
    })
    buffer = {}
  }, rateLimitInterval)

  ws.onerror = (e) => {
    errorCount++
    postError(`WebSocket Hatası oluştu: ${e}`)
  }

  ws.onclose = (e) => {
    ws = null
    clearInterval(bufferInterval)
    postStatus('disconnected', `Bağlantı kapandı (code: ${e.code})`)
    if (!isManuallyClosed) {
      // 3 saniye sonra yeniden bağlanmayı dene
      setTimeout(() => {
        reconnectAttempts++
        postStatus('disconnected', `Yeniden bağlanma denemesi #${reconnectAttempts}`)
        connectWebSocket()
      }, 3000)
    }
  }
}

const disconnectWebSocket = () => {
  isManuallyClosed = true
  if (ws) {
    subscribedPairs.forEach((symbol) => {
      ws?.send(JSON.stringify({ type: 'unsubscribe', symbol }))
    })
    ws.close()
    ws = null
  }
}

;(self as any).onmessage = (event: MessageEvent<MainToWorker>) => {
  const message = event.data
  switch (message.type) {
    case 'subscribe':
      {
        const { pairs } = message.payload!
        pairs.forEach((symbol) => {
          if (!subscribedPairs.includes(symbol)) {
            subscribedPairs.push(symbol)
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'subscribe', symbol }))
            }
          }
        })
        if (!ws) {
          connectWebSocket()
        }
      }
      break
    case 'unsubscribe':
      {
        disconnectWebSocket()
        subscribedPairs = []
      }
      break
    default:
      postError(`Bilinmeyen komut: ${message}`)
  }
}
