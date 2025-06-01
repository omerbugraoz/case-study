import { defineStore } from 'pinia'
import type { IAsset, IAssetStore, IBuyAssetPayload } from '../types/assets'

export const useAssetsStore = defineStore('assets', {
  state: (): IAssetStore => ({
    assets: [],
  }),

  getters: {
    totalPortfolioValue: (state): number => {
      return state.assets.reduce((total, asset) => total + asset.totalValue, 0)
    },

    getAssetsByPair:
      (state) =>
      (pair: string): IAsset[] => {
        return state.assets.filter((asset) => asset.pair === pair)
      },
  },

  actions: {
    buyAsset(payload: IBuyAssetPayload) {
      const newAsset: IAsset = {
        ...payload,
        totalValue: payload.price * payload.volume,
      }

      this.assets.push(newAsset)
    },

    removeAsset(assetIndex: number) {
      this.assets.splice(assetIndex, 1)
    },
  },
})
