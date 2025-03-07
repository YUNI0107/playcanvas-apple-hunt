import useSwr from 'swr'
import { fetchAsset } from '@playcanvas/react/utils'
import { useApp } from '@playcanvas/react/hooks'

const useAsset = (url: string, type: string) => {
  const app = useApp()
  return useSwr(url, (url) => fetchAsset(app, url, type) as Promise<pc.Asset>)
}

export default useAsset
