const AdBlocker = require("@cliqz/adblocker-electron")
const fetch = require("cross-fetch")

const sources = [
    "https://raw.githubusercontent.com/honzaxdddddd/youtube-blacklisted-links/main/links.txt",
	"https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt",
	"https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters-2021.txt",
	"https://secure.fanboy.co.nz/fanboy-annoyance_ubo.txt",
]

module.exports.blockAds = async (session) => {
    const blocker = await AdBlocker.ElectronBlocker.fromLists(fetch, sources)
    blocker.enableBlockingInSession(session)
    console.log(`AdBlocker started.`)
}
