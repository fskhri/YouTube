const DiscordRPC = require("discord-rpc")
const { dialog } = require("electron")

let connected = false;
let rpc = null;
let elapsed = null;

module.exports.load = () => {
    this.rpc = new DiscordRPC.Client({ transport: "ipc" })
    this.rpc.login({ clientId: "922907049170464809" }).catch(e => {
        if (e) return
    })
    this.rpc.on("ready", () => {
        rpc = this.rpc
        console.log(`Discord RPC client has started following: ${this.rpc.user.username}#${this.rpc.user.discriminator}`)
        presence = {
            type: 2, // Listening
            details: "Not watching any videos at the moment...",
            largeImageKey: "large",
            largeImageText: "Not watching videos...",
            state: "Developed by honza#9141",
            smallImageKey: "idle",
            smallImageText: `Idle`,
        }
        this.rpc.setActivity(presence)
    })
}

module.exports.connect = () => {
    if (rpc == null) {
        this.rpc = new DiscordRPC.Client({ transport: "ipc" })
        this.rpc.login({ clientId: "922907049170464809" }).catch(e => {
            if (e)
                dialog.showMessageBox(null, {
                    type: "warning",
                    buttons: ["OK"],
                    defaultId: 2,
                    title: "YouTube",
                    message: "Error launching Discord Rich Presence: " + e
                })
        })
        this.rpc.on("ready", () => {
            rpc = this.rpc
            presence = {
                type: 2, // Listening
                details: "Not watching any videos at the moment...",
                largeImageKey: "large",
                largeImageText: "Not watching videos...",
                state: "Developed by honza#9141",
                smallImageKey: "idle",
                smallImageText: `Idle`,
            }
            this.rpc.setActivity(presence)
            dialog.showMessageBox(null, {
                type: "info",
                buttons: ["OK"],
                defaultId: 2,
                title: "YouTube",
                message: "Discord Rich Presence is running on: " + `${this.rpc.user.username}#${this.rpc.user.discriminator}`
            })
        })
    }
    dialog.showMessageBox(null, {
        type: "info",
        buttons: ["OK"],
        defaultId: 2,
        title: "YouTube",
        message: "Discord Rich Presence is already connected."
    })
}

module.exports.disconnect = (useDialog) => {
    this.rpc.destroy()
    rpc = null
    if (useDialog == true) {
        dialog.showMessageBox(null, {
            type: "info",
            buttons: ["OK"],
            defaultId: 2,
            title: "YouTube",
            message: "Discord Rich Presence is now disabled."
        })
    }
}

module.exports.update = (songInfo) => {
    if (rpc == null) return;
    if (!songInfo) return;
    this.songInfo = songInfo;

    presence = {
        type: 2, // Listening
        details: songInfo.name,
        state: songInfo.author,
        largeImageKey: "large",
        largeImageText: [
            songInfo.uploadDate,
            songInfo.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " views",
            "Developed by honza#9141"
        ].join(" • "),
        smallImageKey: "play",
        smallImageText: `Playing`,
        buttons: [{ label: "Watch With Me", url: songInfo.url }, { label: "Download YouTube", url: "https://github.com/honzaxdddddd/YouTube" }],
    }
    this.rpc.setActivity(presence)
}

module.exports.paused = () => {
    if (rpc == null) return;
    if (!this.songInfo) return;
    presence = {
        type: 2, // Listening
        details: this.songInfo.name,
        state: this.songInfo.author,
        largeImageKey: "large",
        largeImageText: [
            this.songInfo.uploadDate,
            this.songInfo.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " views",
            "Developed by honza#9141"
        ].join(" • "),
        smallImageKey: "pause",
        smallImageText: `Paused`,
        buttons: [{ label: "Watch With Me", url: this.songInfo.url }, { label: "Download YouTube", url: "https://github.com/honzaxdddddd/YouTube" }],
    }
    this.rpc.setActivity(presence)
}

module.exports.getUser = () => {
    if (rpc == null) return "No RPC connected."
    return `${this.rpc.user.username}#${this.rpc.user.discriminator} [${this.rpc.user.id}]`
}

module.exports.searching = () => {
    if (rpc == "null") return;
    presence = {
        type: 2, // Listening
        details: "Browsing videos on YouTube",
        largeImageKey: "large",
        largeImageText: "Developed by honza#9141",
        smallImageKey: "magnifyingglass",
        smallImageText: `Searching`,
    }
    this.rpc.setActivity(presence)
}