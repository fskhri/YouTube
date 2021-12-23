const ytdl = require("ytdl-core")
const ms = require("ms")

module.exports.getSong = async (url) => {
    const video = await ytdl.getInfo(url)
    if(video) {
        info = {
            name: video.videoDetails.title,
            author: video.videoDetails.author.name,
            uploadDate: video.videoDetails.uploadDate,
            views: video.videoDetails.viewCount,
            url: url,
            fullTIme: ms(video.videoDetails.lengthSeconds, { long: true })
        }

        return info;
    } else {
        return console.log(`Error fetching video.`)
    }
}