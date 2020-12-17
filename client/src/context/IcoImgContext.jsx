import { createContext } from 'react'

function noop() {}

export const IcoImgContext = createContext({
  icoVal: [],
  setIco: noop,
  getIco: noop,
  clearIco: noop,
})
