import { connect, elements } from './config'
import jest from 'jest-mock'

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))


describe('Testes da tela de login', () => {
  /** @type WebdriverIO.Browser */
  let driver
  const useElements = elements.Register

  beforeEach(() => {
    driver = connect("Register")
  })

  afterEach(() => {
    driver.deleteSession()
  })

})
