const downloader = require("./scripts/downloadVideo.js")
const discordRPC = require("./scripts/discordRPC")

const { app, Menu, dialog, clipboard } = require("electron")

module.exports.setApplicationMenu = (win) => {
	if (process.platform === "darwin") {
		const name = app.name;
		menuTemplate.unshift({
			label: name,
			submenu: [
				{ role: "about" },
				{ type: "separator" },
				{ role: "hide" },
				{ role: "hideothers" },
				{ role: "unhide" },
				{ type: "separator" },
				{
					label: "Select All",
					accelerator: "CmdOrCtrl+A",
					selector: "selectAll:",
				},
				{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
				{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
				{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
				{ type: "separator" },
				{ role: "minimize" },
				{ role: "close" },
				{ role: "quit" },
			],
		});
	}

	const menu = Menu.buildFromTemplate(
		[
			{
				label: "Downloader",
				submenu: [
					{
						label: "Download this video as .mp3",
						click: () => {
							downloader.asMP3(win.getURL(), win)
						},
					},
					{
						label: "Download this video as .mp4",
						click: () => {
							downloader.asMP4(win.getURL(), win)
						},
					}
				],
			},
			{
				label: "Discord Presence",
				submenu: [
					{
						label: "Connect",
						click: () => {
							discordRPC.connect()
						}
					},
					{
						label: "Disconnect",
						click: () => {
							discordRPC.disconnect(true)
						}
					},
				],
			},
			{
				label: "Options",
				submenu: [
					{
						label: "Copy URL",
						click: () => {
							clipboard.writeText(win.getURL())
						}
					},
					{
						label: "Disable hardware acceleration",
						type: "checkbox",
						click: () => {
							app.disableHardwareAcceleration()
						}
					},
					{
						label: "Dev Tools",
						type: "checkbox",
						click: () => {
							if(win.webContents.isWebToolsOpened = true) {
								win.webContents.closeDevTools()
							}
							win.webContents.openDevTools()
						}
					},
					{
						label: "Reload",
						click: () => {
							win.webContents.reload()
						}
					}
				]
			}
		]
	);
	Menu.setApplicationMenu(menu);
};