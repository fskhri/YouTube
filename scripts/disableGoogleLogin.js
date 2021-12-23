module.exports.disableLogIn = (window) => {
    window.webContents.executeJavaScript(`document.querySelector("#buttons > ytd-button-renderer > a").remove()`)
    try {
        window.webContents.executeJavaScript(`document.querySelector("#sections > ytd-guide-signin-promo-renderer").remove()`)
    } catch(e) {
        // Maybe the menu bar on left side was not opened yet.
    }
    console.log(`Google No-Login is enabled.`)
} 