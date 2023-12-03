import { remote } from "webdriverio"

const activities = {
    "Login": ".MainActivity",
    "Register": ".RegisterActivity",
    "Homepage": ".HomeActivity"
}

const capabilities = {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "Android",
    "appium:appPackage": "com.example.firebase"
}

const elements = {
    "Login": {
        "email": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtEmail"]',
        "password": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtSenha"]',
        "login": '//android.widget.Button[@resource-id="com.example.firebase:id/btnLogin"]',
        "register": '//android.widget.Button[@resource-id="com.example.firebase:id/btnRegisterRedirect"]',
        "errorMsg": '//android.widget.TextView[@resource-id="com.example.firebase:id/tvLoginErrorMessage"]'
    },
    "Register": {
        "email": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtNewEmail"]',
        "name": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtNewName"]',
        "password": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtNewSenha"]',
        "age": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtNewAge"]',
        "register": '//android.widget.Button[@resource-id="com.example.firebase:id/btnRegister"]',
        "back": '//android.widget.Button[@resource-id="com.example.firebase:id/btnBackToLogin"]',
        "errorMsg": '//android.widget.TextView[@resource-id="com.example.firebase:id/tvRegisterErrorMessage"]'
    },
    "Homepage": {
        "title": '//android.widget.TextView[@resource-id="com.example.firebase:id/tvUserName"]',
        "newPassword": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtUpdatePassword"]',
        "newName": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtUpdateName"]',
        "newAge": '//android.widget.EditText[@resource-id="com.example.firebase:id/edtUpdateAge"]',
        "update": '//android.widget.Button[@resource-id="com.example.firebase:id/btnUpdate"]',
        "logout": '//android.widget.Button[@resource-id="com.example.firebase:id/btnLogout"]'
    }
}

/**
 * @param {keyof activities} activity 
 * @returns 
 */
function connect(activity) {
    const wdOpts = {
        hostname: process.env.APPIUM_HOST || "localhost",
        port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
        logLevel: "info",
        capabilities: {
            ...capabilities,
            "appium:appActivity": activities[activity]
        }
    }
    return remote(wdOpts)
}

export {
    connect,
    elements,
    activities
}
