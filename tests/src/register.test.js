import jest from 'jest-mock'
import { v4 as uuid4 } from 'uuid'
import { connect, elements } from './config'
import { expect, beforeEach, afterEach, describe, it } from '@jest/globals'

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))


describe("Screen flow tests", () => {
    /** @type WebdriverIO.Browser */
    let driver
    const useElements = elements.Register

    beforeEach(() => {
        driver = connect("Login")
    })

    afterEach(() => {
        driver.deleteSession()
    })

    async function goToRegister() {
        const register = await driver.$(elements.Login.register)
        await register.click()
    }

    it('Deve redirecionar para a tela de login', async () => {
        driver = await driver
        await goToRegister()
    
        const back = await driver.$(useElements.back)
        await back.click()

        const email = await driver.$(elements.Login.email)
        expect(await email.isDisplayed()).toBeTruthy()
    })
})

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

    it('Deve realizar um cadastro com sucesso', async () => {
        driver = await driver
    
        const uid = uuid4()
        const email = await driver.$(useElements.email)
        await email.setValue(`email_test_${uid}@gmail.com`)

        const name = await driver.$(useElements.name)
        await name.setValue(`Usuário ${uid}`)

        const password = await driver.$(useElements.password)
        await password.setValue("123456")

        const age = await driver.$(useElements.age)
        await age.setValue((1 + Math.random() * 100).toFixed(0))

        const register = await driver.$(useElements.register)
        await register.click()

        await sleep(3000)

        const title = await driver.$(elements.Homepage.title)
        const text = await title.getText()
        expect(text).toBe(`Usuário ${uid}`)
    })

    it('Deve exibir mensagem de erro ao tentar realizar cadastro com email já cadastrado', async () => {
        driver = await driver
    
        const email = await driver.$(useElements.email)
        await email.setValue("j.victoralves411@gmail.com")

        const name = await driver.$(useElements.name)
        await name.setValue("Usuário 2")

        const password = await driver.$(useElements.password)
        await password.setValue("123456")

        const age = await driver.$(useElements.age)
        await age.setValue("20")

        const register = await driver.$(useElements.register)
        await register.click()

        await sleep(3000)

        const errorMsg = await driver.$(useElements.errorMsg)
        expect(await errorMsg.isDisplayed()).toBeTruthy()
    })

    it('Deve redirecionar para a tela de login', async () => {
        driver = await driver
    
        const back = await driver.$(useElements.back)
        await back.click()

        await sleep(2000)

        const email = await driver.$(elements.Login.email)
        expect(await email.isDisplayed()).toBeTruthy()
    })

    it('Deve exibir mensagem de erro ao tentar realizar cadastro sem preencher todos os campos', async () => {
        driver = await driver
    
        const email = await driver.$(useElements.email)
        await email.setValue("email@gmail.com")

        const name = await driver.$(useElements.name)
        await name.setValue("")

        const password = await driver.$(useElements.password)
        await password.setValue("123456")

        const age = await driver.$(useElements.age)
        await age.setValue("")

        const register = await driver.$(useElements.register)
        await register.click()

        await sleep(2000)

        const errorMsg = await driver.$(useElements.errorMsg)
        expect(await errorMsg.isDisplayed()).toBeTruthy()
    })

    it('Deve exibir mensagem de erro ao tentar realizar cadastro com email inválido', async () => {
        driver = await driver
    
        const email = await driver.$(useElements.email)
        await email.setValue("email")

        const name = await driver.$(useElements.name)
        await name.setValue("Usuário")

        const password = await driver.$(useElements.password)
        await password.setValue("123456")

        const age = await driver.$(useElements.age)
        await age.setValue("20")

        const register = await driver.$(useElements.register)
        await register.click()

        await sleep(2000)

        const errorMsg = await driver.$(useElements.errorMsg)
        expect(await errorMsg.isDisplayed()).toBeTruthy()
    })

    it('Deve exibir mensagem de erro ao tentar realizar cadastro com idade inválida', async () => {
        driver = await driver
    
        const email = await driver.$(useElements.email)
        await email.setValue("email@gmail.com")

        const name = await driver.$(useElements.name)
        await name.setValue("Usuário")

        const password = await driver.$(useElements.password)
        await password.setValue("123456")

        const age = await driver.$(useElements.age)
        await age.setValue("abc")

        const register = await driver.$(useElements.register)
        await register.click()

        await sleep(2000)

        const errorMsg = await driver.$(useElements.errorMsg)
        expect(await errorMsg.isDisplayed()).toBeTruthy()
    })
})
