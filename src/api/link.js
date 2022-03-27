const axios = require('axios')

module.exports = async(req, res) => {
    const reqLink = req.query.query
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate")
    res.setHeader("Open-Source", "https://github.com/cachecleanerjeet/JiosaavnAPI")
    res.setHeader("Made-By", "Tuhin Kanti Pal, https://github.com/cachecleanerjeet")

    var songId = await getId(reqLink)
    if (songId == "error") res.json({ result: "false" })

    axios({
        method: 'get',
        url: `https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${songId}`
    })

    .then(async function(response) {
            var data = JSON.parse(JSON.stringify(response.data).replace(songId, "TempID").replace(/&amp;/gi, "&").replace(/&quot;/gi, "'").replace(/&copy;/gi, "©")).TempID
            res.json({
                id: data.id,
                song: data.song,
                album: data.album,
                year: data.year,
                primary_artists: data.primary_artists,
                singers: data.singers,
                image: data.image.replace("150x150", "500x500"),
                label: data.label,
                albumid: data.albumid,
                language: data.language,
                copyright_text: data.copyright_text,
                has_lyrics: data.has_lyrics,
                media_url: data.media_preview_url.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_160'),
                other_qualities: [{
                        quality: "96_KBPS",
                        url: data.media_preview_url.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_96')
                    },
                    {
                        quality: "160_KBPS",
                        url: data.media_preview_url.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_160')
                    },
                    {
                        quality: "320_KBPS",
                        url: data.media_preview_url.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_320')
                    }
                ],
                perma_url: data.perma_url,
                album_url: data.album_url,
                release_date: data.release_date,
                repo_url: "https://github.com/cachecleanerjeet/JiosaavnAPI"
            })
        })
        .catch(function(error) {
            res.json({ result: "false" })
        })
}

async function getId(reqLink) {
    return axios({
        method: 'get',
        url: reqLink
    })

    .then(async function(dom) {
            return dom.data.split('"song":{"type":"')[1].split('","image":')[0].split('"')[8];
        })
        .catch(function(domError) {
            return "error"
        })
}
