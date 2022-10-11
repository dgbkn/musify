
var endpoints = {
  // BASE_API_URL : "https://crosdev.herokuapp.com/https://www.jiosaavn.com/api.php?",

  // BASE_API_URL : "https://dns.spotifie.workers.dev/https/www.jiosaavn.com/api.php?",
  // PROXY : "https://dns.spotifie.workers.dev/https/",

  BASE_API_URL : "https://cors.spotifie.workers.dev/?https://www.jiosaavn.com/api.php?",
  PROXY : "https://cors.spotifie.workers.dev/?https://",


  

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
    homegetCharts:
    '__call=content.getCharts&fetch_from_serialized_files=true&p=1&n=50&api_version=4&_format=json&_marker=0&ctx=web6dot0',
    searchData:'p=1&_format=json&_marker=0&api_version=4&ctx=wap6dot0&n=10&__call=search.getResults&q=',
    getPodcasts:'__call=content.getTopShows&api_version=4&_format=json&_marker=0&n=20&p=1&ctx=web6dot0',
    getRadios:'__call=webradio.getFeaturedStations&api_version=4&_format=json&_marker=0&ctx=web6dot0',
    getArtists:'__call=social.getTopArtists&api_version=4&_format=json&_marker=0&ctx=web6dot0',

    getDefaultStationofRadio: (name,lang) => {
     return `language=${lang}&pid=&query=&name=${encodeURIComponent(name)}&mode=&artistid=&api_version=4&_format=json&_marker=0&ctx=web6dot0&__call=webradio.createFeaturedStation`
    },
    
    getEndpointofTypeofContent: (type) => {
      switch (type) {
        case 'album':
          return endpoints.albumDetailsBaseUrl;
        case 'show':
          return '__call=webapi.get&type=show&season_number=&sort_order=&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0&token=';
        case 'playlist':
           return endpoints.playlistDetailsBaseUrl;
           case 'artist':
            return '__call=webapi.get&type=artist&p=&n_song=50&n_album=50&sub_type=&category=&sort_order=&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0&token=';
          case 'radio_station':
              return '__call=webradio.getSong&k=20&next=1&api_version=4&_format=json&_marker=0&ctx=web6dot0&stationid=';
        default:
          return '__call=playlist.getDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&listid=';
      }
       },

       getDecrptedUrl: (encrypted,bitrate=320) => {
        //example =  __call=song.generateAuthToken&url=iPPGVzyogeiPwpro65A0eUaQggN%2B8%2BJ4nDZxhpeCf3cT9UYXJaPjPMK1eVm3nDhsWVcLNK%2FJ8wQEZ%2B5JQTCHjYPzFaL%2FaK97&bitrate=128&api_version=4&_format=json&ctx=web6dot0&_marker=0
        return `__call=song.generateAuthToken&url=${encodeURIComponent(encrypted)}&bitrate=${bitrate}&api_version=4&_format=json&ctx=web6dot0&_marker=0`; 
       }

}



export default endpoints;
