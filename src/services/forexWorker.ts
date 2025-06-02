/// <reference lib="webworker" />
import { parseFinnhubMessage } from '../utils/validation'
import type { TickData, MainToWorker, TickMessage, StatusMessage, ErrorMessage } from '../types/websocket'

let ws: WebSocket | null = null
let subscribedPairs: string[] = []
let rateLimitInterval: number = 1000
let buffer: Record<string, TickData> = {}

const SUBSCRIPTION_DELAY = 500
let pingInterval: NodeJS.Timeout | null = null

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

  //api key kontrolü
  if (!API_KEY || API_KEY.trim() === '') {
    postError('API key bulunamadı')
    return
  }

  const url = `wss://ws.finnhub.io?token=${API_KEY}`
  ws = new WebSocket(url)

  ws.onopen = () => {
    postStatus('connected', 'WebSocket açıldı')
    reconnectAttempts = 0

    //verilen pairleri subscribe et
    subscribedPairs.forEach((symbol) => {
      ws?.send(JSON.stringify({ type: 'subscribe', symbol }))
    })

    //ping intervali 30 saniyede bir bğlantıyı canlı tutmak için ping gönderir
    pingInterval = setInterval(() => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, 30000)
  }

  ws.onmessage = (event) => {
    messageCount++

    //gelen datayı parse ediyoruz
    const ticks = parseFinnhubMessage(event.data)
    if (ticks.length === 0) return

    //buffer'a ekle
    ticks.forEach((t) => {
      buffer[t.symbol] = t
    })
  }

  //buffer'ın içindeki datayı rateLimitInterval'de bir kere post ediyoruz
  const bufferInterval = setInterval(() => {
    Object.values(buffer).forEach((tick) => {
      postTick(tick)
    })
    buffer = {}
  }, rateLimitInterval)

  //hata durumunda errorCount'u arttırıyoruz ve error mesajını post ediyoruz
  ws.onerror = (e) => {
    errorCount++
    console.error('WebSocket Error Details:', e)
    postError(`WebSocket Hatası: ${e.type} - Reconnect attempt: ${reconnectAttempts}`)
  }

  //bağlantı kapandığında bağlantıyı kapatıyor ve bufferInterval'i temizliyoruz
  ws.onclose = (e) => {
    ws = null
    clearInterval(bufferInterval)
    postStatus('disconnected', `Bağlantı kapandı (code: ${e.code})`)
    if (!isManuallyClosed) {
      // Her basarisiz baglanti denemesinde bekleme süresini 2'nin ussu olarak artiriyoruz
      // Maksimum 30 saniye olacak sekilde sinirlandiriyoruz
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000)
      setTimeout(() => {
        reconnectAttempts++
        postStatus('disconnected', `Yeniden bağlanma denemesi #${reconnectAttempts}`)
        connectWebSocket()
      }, delay)
    }
  }
}

//bağlantıyı kapatıyor ve bufferInterval'i temizliyoruz
const disconnectWebSocket = () => {
  isManuallyClosed = true
  if (ws) {
    subscribedPairs.forEach((symbol) => {
      ws?.send(JSON.stringify({ type: 'unsubscribe', symbol }))
    })
    ws.close()
    ws = null
    if (pingInterval) {
      clearInterval(pingInterval)
      pingInterval = null
    }
  }
}

//gelen mesajları handle ediyoruz
;(self as any).onmessage = (event: MessageEvent<MainToWorker>) => {
  const message = event.data
  switch (message.type) {
    case 'subscribe':
      {
        const { pairs } = message.payload!
        for (const symbol of pairs) {
          if (!subscribedPairs.includes(symbol)) {
            subscribedPairs.push(symbol)
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'subscribe', symbol }))
              //delay ekliyoruz çünkü finnhub'ın rate limiti varmis
              new Promise((resolve) => setTimeout(resolve, SUBSCRIPTION_DELAY))
            }
          }
        }
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
