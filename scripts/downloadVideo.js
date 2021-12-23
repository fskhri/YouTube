const ytdl = require("ytdl-core")
const fs = require("fs")
const path = require("path")

const getSongInfo = require("./getSongInfo")

const { dialog } = require("electron")

module.exports.asMP3 = (url, window) => {
    dialog.showMessageBox(null, {
        type: "info",
        buttons: ["OK"],
        defaultId: 2,
        title: "YouTube",
        message: `Downloading audio from URL: ${url}` 
    })
    getSongInfo.getSong(url).then(songInfo => {
        const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" })
        stream.pipe(fs.createWriteStream("./downloads/" + `${songInfo.author} - ${songInfo.name}.mp3`))
        stream.on("end", () => {
            dialog.showMessageBox(null, {
                type: "info",
                buttons: ["OK"],
                defaultId: 2,
                title: "YouTube",
                message: "Audio has been saved in \"downloads\" folder as: " + `${songInfo.author} - ${songInfo.name}.mp3`
            })
        })
    })
}

module.exports.asMP4 = (url, window) => {
    dialog.showMessageBox(null, {
        type: "info",
        buttons: ["OK"],
        defaultId: 2,
        title: "YouTube",
        message: `Downloading video from URL: ${url}` 
    })
    getSongInfo.getSong(url).then(songInfo => {
        const stream = ytdl(url, { filter: format => format.container === 'mp4', quality: "highest" })
        stream.pipe(fs.createWriteStream("./downloads/" + `${songInfo.author} - ${songInfo.name}.mp4`))
        stream.on("end", () => {
            dialog.showMessageBox(null, {
                type: "info",
                buttons: ["OK"],
                defaultId: 2,
                title: "YouTube",
                message: "Audio has been saved in \"downloads\" folder as: " + `${songInfo.author} - ${songInfo.name}.mp4`
            })
        })
    })
}