var endpoints = {
  searchBaseUrl:
    '__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=',
  songDetailsBaseUrl:
    '__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=',
  albumDetailsBaseUrl:
    '__call=content.getAlbumDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&albumid=',
  lyricsBaseUrl:
    '__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id=',
    playlistDetailsBaseUrl:
    '__call=playlist.getDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&listid=',
   homenewSongs:
    '__call=webapi.get&type=playlist&p=1&n=50&includeMetaTags=0&ctx=wap6dot0&api_version=4&_format=json&_marker=0',
    homenewPlaylists:
    '__call=content.getFeaturedPlaylists&fetch_from_serialized_files=true&p=1&n=50&api_version=4&_format=json&_marker=0&ctx=web6dot0',

}



export default endpoints;
