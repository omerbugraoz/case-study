import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TickData } from '../types/websocket'
import { ForexService } from '../services/websocket-service'
import { FOREX_PAIRS } from '../utils/constants'

interface EnhancedTickData extends TickData {
  previousPrice?: number
  changePercent: number
}

export const useForexStore = defineStore('forex', () => {
  const ticks = ref<Record<string, EnhancedTickData>>({})

  const status = ref<string>('disconnected')
  const statusInfo = ref<string | undefined>(undefined)
  const errorLog = ref<string[]>([])

  const service = new ForexService()

  service.onTick((tick) => {
    const prevTick = ticks.value[tick.symbol]
    const previousPrice = prevTick?.price
    const changePercent = previousPrice ? ((tick.price - previousPrice) / previousPrice) * 100 : 0

    ticks.value[tick.symbol] = {
      ...tick,
      previousPrice,
      changePercent,
    }
  })

  service.onStatus((st) => {
    status.value = st.status
    statusInfo.value = st.info
  })

  service.onError((err) => {
    errorLog.value.push(err)
  })

  const start = () => {
    service.subscribePairs(FOREX_PAIRS)
  }

  const stop = () => {
    service.disconnect()
  }

  return {
    ticks,
    status,
    statusInfo,
    errorLog,
    start,
    stop,
  }
})
