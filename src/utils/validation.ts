import type { TickData } from '../types/websocket'

export const isValidTick = (obj: any): obj is TickData => {
  if (
    typeof obj !== 'object' ||
    obj === null ||
    typeof obj.symbol !== 'string' ||
    typeof obj.price !== 'number' ||
    typeof obj.volume !== 'number' ||
    typeof obj.timestamp !== 'number'
  ) {
    return false
  }
  return true
}

export const parseFinnhubMessage = (raw: string): TickData[] => {
  try {
    const parsed = JSON.parse(raw)

    if (parsed.type !== 'trade' || !Array.isArray(parsed.data)) {
      return []
    }

    const result: TickData[] = []
    for (const item of parsed.data) {
      const tick = {
        symbol: item.s,
        price: Number(item.p),
        volume: Number(item.v),
        timestamp: Number(item.t),
      }

      if (isValidTick(tick)) {
        result.push(tick)
      }
    }

    return result
  } catch (e) {
    console.warn('WebSocket: Mesaj işlenemedi.', e)
    return []
  }
}
