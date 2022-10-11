import { connect } from 'react-redux';
import { changeTrack } from '../../../actions';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-button';
import axios from 'axios';
import { PLAYLIST as PLAYLISTOLD } from "../../../data/index";
import styles from "./music-control-box.module.css";
import { useState } from 'react';

import endpoints from './../../../endpoints.js';


function MusicControlBox(props) {

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
                fileName = `${SONGS[index].title.replace(" ", "_")}_by_dev.mp3`;
            } else {
                fileName = `${SONGS[index].song.replace(" ", "_")}_by_dev.mp3`;
            }

            if (!("media_preview_url" in SONGS[index])) {



                var songData = SONGS[index];

                const abortCont = new AbortController();
                fetch(`${endpoints.PROXY}www.jiosaavn.com/api.php?${endpoints.songDetailsBaseUrl}${songData.id}`, { signal: abortCont.signal })
                    .then(res => {
                        if (!res.ok) { // error coming back from server
                            throw Error('Could Not fetch the data for that resource');
                        }
                        return res.json();
                    })
                    .then(results => {
                        console.log(results);
                        var media_pre= "media_preview_url" in  results[Object.keys(results)[0]] ? results[Object.keys(results)[0]]["media_preview_url"] : "";


                        if (results && "encrypted_media_url" in results[Object.keys(results)[0]] && !media_pre) {

                            var dfd = results[Object.keys(results)[0]]?.encrypted_media_url;

                            var uri = endpoints.BASE_API_URL + endpoints.getDecrptedUrl(dfd);

                            fetch(uri)
                                .then(res => {
                                    if (!res.ok) { // error coming back from server
                                        console.log('Could Not fetch the data for that resource');
                                        return "";
                                    }
                                    return res.json();
                                })
                                .then(data => {
                                    url = data.auth_url;
                                        url = proxy + url.replace('https://', '');
                                    
                    


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

                                })
                                .catch(err => {
                                    if (err.name === 'AbortError') {
                                        console.log('fetch aborted');
                                    } else {
                                        console.log(err);
                                    }
                                });

                        }else if(media_pre){
                            url = media_pre.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_320');
                            url = proxy + url.replace('https://', '');

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
                    })
                    .catch(err => {
                        if (err.name === 'AbortError') {
                            console.log('fetch aborted')
                        } else {
                            // auto catches network / connection error
                            console.log('fetch error')
                        }
                    });

                // abort the fetch
                return () => abortCont.abort();



            } else {
                url = SONGS[index].media_preview_url.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_320');
                    url = proxy + url.replace('https://', '');
        
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
        trackData: state.trackData
    };
};

export default connect(mapStateToProps, { changeTrack })(MusicControlBox);