import jest from 'jest-mock'
import { connect, elements } from './config'
import { expect, beforeEach, afterEach, describe, it } from '@jest/globals'

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const dummyUser = {
    email: "dummy@gmail.com",
    name: "Dummy",
    age: "20",
    password: "123456"
}


describe("Testes da tela de Homepage", () => {
    /** @type WebdriverIO.Browser */
    let driver
    const useElements = elements.Homepage

    beforeEach(() => {
        driver = connect("Login")
    })

    afterEach(() => {
        driver.deleteSession()
    })

    async function login(password) {
        const email = await driver.$(elements.Login.email)
        await email.setValue(dummyUser.email)

        const password_input = await driver.$(elements.Login.password)
        await password_input.setValue(password ?? dummyUser.password)

        const login = await driver.$(elements.Login.login)
        await login.click()

        await sleep(2000)
    }

    async function logout() {
        const logout = await driver.$(useElements.logout)
        await logout.click()
    }

    async function resetUserData() {
        const newPassword = await driver.$(useElements.newPassword)
        await newPassword.setValue(dummyUser.password)

        const newName = await driver.$(useElements.newName)
        await newName.setValue(dummyUser.name)

        const newAge = await driver.$(useElements.newAge)
        await newAge.setValue(dummyUser.age)

        const update = await driver.$(useElements.update)
        await update.click()

        await sleep(2000)
    }


    // Tests

    it('Deve realizar logout', async () => {
        driver = await driver
        await login()

        const logout = await driver.$(useElements.logout)
        await logout.click()

        await sleep(2000)

        const email = await driver.$(elements.Login.email)
        expect(await email.isDisplayed()).toBeTruthy()
    })

    it('Deve atualizar os dados do usuário', async () => {
        driver = await driver
        await login()
    
        const newPassword = await driver.$(useElements.newPassword)
        await newPassword.setValue("newPassowrd")

        const newName = await driver.$(useElements.newName)
        await newName.setValue("Usuário 2")

        const newAgeValue = (1 + Math.random() * 100).toFixed(0)
        const newAge = await driver.$(useElements.newAge)
        await newAge.setValue(newAgeValue)

        const update = await driver.$(useElements.update)
        await update.click()

        await sleep(2000)

        await logout()
        await login("newPassowrd")

        const title = await driver.$(useElements.title)
        expect(await title.getText()).toBe("Usuário 2")
        expect(await newPassword.getText()).toBe("Nova Senha")
        expect(await newName.getText()).toBe("Usuário 2")
        expect(await newAge.getText()).toBe(newAgeValue)

        await resetUserData()
    }, 60 * 1000)
})
