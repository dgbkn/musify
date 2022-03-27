import { PLAYLIST } from "../data/index";
import { PLAYPAUSE, CHANGETRACK } from "../actions/index";

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
      console.log(JSON.parse(window.localStorage.getItem("currentTracksinPlayLists")));
      var jsonList = JSON.parse(window.localStorage.getItem("currentTracksinPlayLists"));
      return {
        ...state,
        trackData: {
          ...state.trackData,
          trackKey: action.payload,
          track: `${
            jsonList[action.payload[1]].media_preview_url.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_320')
          }`,
          trackName: `${
            jsonList[action.payload[1]].song
          }`,
          trackImg: `${
            jsonList[action.payload[1]].image
          }`,
          trackArtist: `${
            jsonList[action.payload[1]].singers
          }`
        }
      };
    default:
      return state;
  }
};
