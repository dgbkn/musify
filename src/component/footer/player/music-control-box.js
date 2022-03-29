import { connect } from 'react-redux';
import { changeTrack } from '../../../actions';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-button';
import axios from 'axios';
import { PLAYLIST as PLAYLISTOLD } from "../../../data/index";
import styles from "./music-control-box.module.css";
import { useState } from 'react';




function MusicControlBox(props) {

    const [isDownloading,setisDownloading] = useState(false);

    const downloadFile = (url, fileName) => {
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
                   onClick={()=>downloadFile(`https://thawing-scrubland-27252.herokuapp.com/api?uri=${encodeURIComponent(!SONGS ? PLAYLISTOLD[0].playlistData[props.trackData.trackKey[1]].link : SONGS[props.trackData.trackKey[1]].media_preview_url.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_320'))}`,`${( !SONGS ? PLAYLISTOLD[0].playlistData[props.trackData.trackKey[1]].songName : SONGS[props.trackData.trackKey[1]].song).replace(" ","_")}_by_dev.mp3`)}
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
        trackData: state.trackData
    };
};

export default connect(mapStateToProps, { changeTrack })(MusicControlBox);