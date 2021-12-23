const electron = require("electron")
const title = require("console-title")
const col = require("cli-color")
const moment = require("moment")
const path = require("path")

title(`YouTube | Debug`)

const discordRPC = require("./scripts/discordRPC")
const getSongInfo = require("./scripts/getSongInfo")
const disableGoogleLogin = require("./scripts/disableGoogleLogin")
const adBlocker = require("./scripts/adBlocker")
const taskbarControls = require("./scripts/taskbarControls")
const mainMenu = require("./mainMenu")

let playing = false;
this.isPlaying = playing

const app = electron.app;
app.once("ready", () => {
    async function load() {
        const window = new electron.BrowserWindow({
            icon: "youtube.ico",
            darkTheme: true,
            thickFrame: true,
            backgroundColor: "#000",
            width: 1280,
            height: 720,
            show: false,
            title: "YouTube",
            webPreferences: {
                preload: path.join(__dirname, "preload.js")
            }
        })
        window.loadURL("https://youtube.com")
        mainMenu.setApplicationMenu(window)

        window.once("ready-to-show", () => {
            window.maximize()

            discordRPC.load()
            //adBlocker.blockAds(window.webContents.session)
            taskbarControls(window)

            window.webContents.on("media-started-playing", () => {
                playing = true;
                if (window.webContents.getURL().toLowerCase().includes("search_query") || window.webContents.getURL().toLowerCase() == "https://www.youtube.com/" || window.webContents.getURL().toLowerCase() == "https://youtube.com/" || window.webContents.getURL().toLowerCase().includes("/channel/")) return;
                else {
                    getSongInfo.getSong(window.webContents.getURL()).then(songInfo => {
                        window.setTitle(`YouTube [PLAYING]: ${songInfo.author} | ${songInfo.name} • Discord RPC: ${discordRPC.getUser()}`)
                        discordRPC.update(songInfo)
                    })
                }
            })
            window.webContents.on("media-paused", () => {
                playing = false;
                discordRPC.paused()
                window.setTitle(window.getTitle().replace("PLAYING", "PAUSED"))
            })
            window.webContents.on("page-title-updated", () => {
                if (window.getURL().toLowerCase() === "https://www.youtube.com/") discordRPC.disconnect(false); isPlaying = false
                if (window.webContents.getURL().includes("search_query")) {
                    const text = window.webContents.getURL().slice(45)
                    const query = text.replace("+", "")
                    window.setTitle(`YouTube: Browsing Videos with query \"${query}\"`)
                    discordRPC.searching()
                    playing = false
                }
            })
        })
        window.webContents.on("did-finish-load", () => {
            if (window.webContents.getURL().includes("youtube.com")) {
                if (window.webContents.getURL().includes("youtube.com")) disableGoogleLogin.disableLogIn(window)
                window.show()
            }
        })
    }
    console.log(`Application is ready! Loading...`)
    load()
})