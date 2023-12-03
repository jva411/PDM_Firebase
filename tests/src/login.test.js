import jest from 'jest-mock'
import { connect, elements } from './config'
import { expect, beforeEach, afterEach, describe, it } from '@jest/globals'

global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))


describe('Testes da tela de login', () => {
    /** @type WebdriverIO.Browser */
    let driver
    const useElements = elements.Login

    beforeEach(() => {
        driver = connect("Login")
    })

    afterEach(() => {
        driver.deleteSession()
    })

    it('Deve realizar um login com sucesso', async () => {
        driver = await driver

        const email = await driver.$(useElements.email)
        await email.setValue("j.victoralves411@gmail.com")

        const password = await driver.$(useElements.password)
        await password.setValue("123456")

        const errorMsg = await driver.$(useElements.errorMsg)
        expect(await errorMsg.isDisplayed()).toBeFalsy()

        const login = await driver.$(useElements.login)
        await login.click()

        await sleep(2000)

        const title = await driver.$(elements.Homepage.title)
        const text = await title.getText()
        expect(text).toBe("Usuário 2")
    })

    it('Deve exibir mensagem de erro ao tentar realizar login com credenciais inválidas', async () => {
        driver = await driver

        const email = await driver.$(useElements.email)
        await email.setValue("a")

        const password = await driver.$(useElements.password)
        await password.setValue("b")

        const login = await driver.$(useElements.login)
        await login.click()

        await sleep(2000)

        const errorMsg = await driver.$(useElements.errorMsg)
        expect(await errorMsg.isDisplayed()).toBeTruthy()
    })

    it('Deve redirecionar para a tela de registro', async () => {
        driver = await driver

        const register = await driver.$(useElements.register)
        await register.click()

        await sleep(2000)

        const email = await driver.$(elements.Register.email)
        expect(await email.getAttribute("hint")).toBe("Email")
    })
})
