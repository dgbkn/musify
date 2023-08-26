import { PLAYLIST } from "../data/index";
import { PLAYPAUSE, CHANGETRACK } from "../actions/index";
import { directDecryptMessage } from "../utils";

const INITIAL_STATE = {
  trackData: {
    trackKey: [0, 0],
    track: `${PLAYLIST[0].playlistData[0].link}`,
    trackName: `${PLAYLIST[0].playlistData[0].songName}`,
    trackImg: `${PLAYLIST[0].playlistData[0].songimg}`,
    trackArtist: `${PLAYLIST[0].playlistData[0].songArtist}`
  },
  isPlaying: false
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYPAUSE:
      return {
        ...state,
        isPlaying: action.payload
      };
    case CHANGETRACK:
      // console.log(JSON.parse(window.localStorage.getItem("currentTracksinPlayLists")));
      var currentSongs = JSON.parse(window.localStorage.getItem("currentTracksinPlayLists"));
      var songIndex = action.payload[1];

      var dataReturn ={
        ...state,
        trackData: {
          ...state.trackData, 
          trackKey: action.payload,
          track: `${
            directDecryptMessage(currentSongs[songIndex].encrypted_media_url)
          }`,
          trackName: `${
            currentSongs[songIndex].song
          }`,
          trackId: `${
            currentSongs[songIndex].id
          }`,
          trackImg: `${
            currentSongs[songIndex].image
          }`,
          trackArtist: `${
            currentSongs[songIndex].singers
          }`
        }
      }

      console.log("DATAISGOLD",dataReturn);
      return dataReturn;

    default:
      return state;
  }
};
