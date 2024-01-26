import { connect } from 'react-redux';
import { changeTrack,changePlay } from '../../../actions';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-button';
import axios from 'axios';
import { PLAYLIST as PLAYLISTOLD } from "../../../data/index";
import styles from "./music-control-box.module.css";
import { useEffect, useState } from 'react';

import endpoints from './../../../endpoints.js';
import { directDecryptMessage } from '../../../utils';


function MusicControlBox(props) {

    useEffect( () => {
        console.log(props);
        setMediaSession();
    } , [props]);

    let setMediaSession = () => {
        if (!navigator.mediaSession) {return;}
        var trackPlaying = props.trackData;
        navigator.mediaSession.metadata = new window.MediaMetadata({ title: trackPlaying.trackName, artist: trackPlaying.trackArtist, album: "SPOTIFIE", artwork: [
            { src: trackPlaying.trackImg, sizes: '96x96', type: 'image/png' },
            { src: trackPlaying.trackImg, sizes: '128x128', type: 'image/png' },
            // ... other sizes
          ] });
        //we tie the controls of the compact player to the controls of the <audio> element on the page
        //haven't implemented functions for seekbackward, seekforward, and seekto. See reference: https://developer.mozilla.org/en-US/docs/Web/API/MediaSession
        navigator.mediaSession.setActionHandler('play', ()=>{props.changePlay(true)});
        navigator.mediaSession.setActionHandler('pause', ()=>{props.changePlay()});
        // navigator.mediaSession.setActionHandler('stop', stopTrack);
        navigator.mediaSession.setActionHandler('previoustrack', decreaseIndex);
        navigator.mediaSession.setActionHandler('nexttrack', increaseIndex);
        //navigator.mediaSession.setActionHandler('seekbackward', function(){});
        //navigator.mediaSession.setActionHandler('seekforward',  function(){});
        //navigator.mediaSession.setActionHandler('seekto', function(){});
        navigator.mediaSession.playbackState = "playing";
    }


    const [isDownloading, setisDownloading] = useState(false);

    const downloadFile = (index) => {
        var proxy = endpoints.PROXY;



        var url;
        var fileName;

        if (!SONGS) {
            url = endpoints.PROXY + encodeURIComponent(PLAYLISTOLD[0].playlistData[index].link);
            fileName = PLAYLISTOLD[0].playlistData[index].songName;
        }
        else {

            if (!("song" in SONGS[index])) {
                fileName = `${SONGS[index].title.replace(" ", "_")}_spotifie.mp3`;
            } else {
                fileName = `${SONGS[index].song.replace(" ", "_")}_spotifie.mp3`;
            }


                url = "https://proxy.goincop1.workers.dev/https/" +  directDecryptMessage(SONGS[index].encrypted_media_url).replace("https://","").replace("http://","");
        
                setisDownloading(true);
                axios({
                    url,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    setisDownloading(false);
                    const blobbedResponse = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = blobbedResponse;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                });


            }
    }


    var PLAYLIST = JSON.parse(window.localStorage.getItem("playLists"));
    var PLAYLISTCURRECT = JSON.parse(window.localStorage.getItem("currentplaylist"));
    var SONGS = PLAYLISTCURRECT?.songs;
    // var totalSong = PLAYLIST[0].more_info.song_count

    function decreaseIndex() {
        if (props.trackData.trackKey[1] == 0) {
            props.changeTrack([props.trackData.trackKey[0], (SONGS.length) - 1])

        } else {
            props.changeTrack([props.trackData.trackKey[0], props.trackData.trackKey[1] - 1])
        }
    }
    
    function increaseIndex() {
        var index = PLAYLIST.map(function (e) { return e.id; }).indexOf(PLAYLISTCURRECT.listid);

        if (props.trackData.trackKey[1] == (SONGS.length) - 1) {
            props.changeTrack([props.trackData.trackKey[0], 0])
        } else {
            props.changeTrack([props.trackData.trackKey[0], parseInt(props.trackData.trackKey[1]) + 1])
        }
    }

    return (
        <div className={styles.musicControl}>

            <button className={styles.button}
                onClick={() => downloadFile(props.trackData.trackKey[1])}
            >
                {isDownloading ? <div id="loader" className={styles.nfLoader}></div> : <Icons.DownloadApp />}
            </button>



            <IconButton icon={<Icons.Mix />} activeicon={<Icons.Mix />} />
            <button className={styles.button} onClick={decreaseIndex}>
                <Icons.Prev />
            </button>



            <PlayButton isthisplay={true} />
            <button className={styles.button} onClick={increaseIndex}>
                <Icons.Next />
            </button>
            <IconButton icon={<Icons.Loop />} activeicon={<Icons.Loop />} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        trackData: state.trackData,
        isPlaying: state.isPlaying
    };
};
  
export default connect(mapStateToProps, { changeTrack, changePlay })(MusicControlBox);