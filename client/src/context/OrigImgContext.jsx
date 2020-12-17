import { createContext } from 'react'

function noop() {}

export const OrigImgContext = createContext({
  origVal: [],
  setOrig: noop,
  getOrig: noop,
  clearOrig: noop,
})
