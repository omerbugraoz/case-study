export interface IAsset {
  id: number
  pair: string
  price: number
  volume: number
  changePercent: number
  lastUpdate: string
  totalValue: number
}

export interface IAssetStore {
  assets: IAsset[]
}

export interface IBuyAssetPayload {
  id: number
  pair: string
  price: number
  volume: number
  changePercent: number
  lastUpdate: string
}
