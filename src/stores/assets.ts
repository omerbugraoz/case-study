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
        return state.assets.filter((asset) => asset.symbol === pair)
      },
  },

  actions: {
    buyAsset(payload: IBuyAssetPayload) {
      const existingAssetIndex = this.assets.findIndex((asset) => asset.symbol === payload.symbol)

      //check asset is already in the portfolio
      if (existingAssetIndex !== -1) {
        const existingAsset = this.assets[existingAssetIndex] as IAsset
        const totalVolume = existingAsset.volume + payload.volume

        const totalValue = existingAsset.totalValue + payload.price * payload.volume
        const averagePrice = totalValue / totalVolume

        this.assets[existingAssetIndex] = {
          id: existingAsset.id,
          symbol: existingAsset.symbol,
          volume: totalVolume,
          price: averagePrice,
          totalValue: Number(totalValue.toFixed(5)),
          lastUpdate: payload.lastUpdate,
          changePercent: payload.changePercent,
        }
      } else {
        //if not, add new position
        const newAsset: IAsset = {
          ...payload,
          totalValue: payload.price * payload.volume,
        }
        this.assets.push(newAsset)
      }
    },

    removeAsset(assetIndex: number) {
      this.assets.splice(assetIndex, 1)
    },
  },
})
