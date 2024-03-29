import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { changePlay,changeTrack } from '../../actions';
import TextBoldL from "../text/text-bold-l";
import TextRegularM from "../text/text-regular-m";
import Playgif from '../../image/now-play.gif';
import * as Icons from '../icons';
import convertTime from '../../functions/convertTime';
import styles from "./playlist-track.module.css";
import useFetch from '../../hooks/useFetch';
import endpoints from '../../endpoints';
import SkeletonElement from "../SkeletonElement/SkeletonElement";
import { useHistory } from "react-router-dom";

function PlaylistTrackIncomplete(props) {
    const [thisSong, setthisSong] = useState(false);
    
    var songData = props.data?.song;

    var { loading, error, data } = useFetch(endpoints.songDetailsBaseUrl, songData.id);

    const history = useHistory();


    /*setInterval(function(){
        setthisSong(props.data.song.link == localStorage.getItem('playedSong'));
    }, 50);*/

    useEffect(() => {
        if (data) {
            if(props.data.song.id === props.trackData.trackId && props.isPlaying === true){
                setthisSong(true)
            } else {
                setthisSong(false)
            }
        }
    }, [data])


    function unEscape(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g, "<");
        htmlStr = htmlStr.replace(/&gt;/g, ">");
        htmlStr = htmlStr.replace(/&quot;/g, "\"");
        htmlStr = htmlStr.replace(/&#39;/g, "\'");
        htmlStr = htmlStr.replace(/&amp;/g, "&");
        return htmlStr;
    }



    return (
        <>
            {loading &&
                <>  <SkeletonElement />
                </>

            }
            {error && <div className="errored">Oops, an error occurred.</div>}

            {!loading && data && data[Object.keys(data)[0]] && (

                <button
                    key={props.data.id}
                    onClick={async () => {

                        var otherTracks = JSON.parse(window.localStorage.getItem("currentTracksinPlayLists"));
                        var indexOfSong = props.data.index - 1;
                        var song = data[Object.keys(data)[0]];
                        otherTracks[indexOfSong] = song;
    
                        window.localStorage.setItem("currentTracksinPlayLists", JSON.stringify(otherTracks));
                        props.changeTrack([JSON.parse(window.localStorage.getItem("playLists")), indexOfSong]);
                        props.changePlay(true);	
                    }}
                    className={styles.SongBtn}
                >

                    <div
                        className={`${styles.trackDiv} ${thisSong ? "activeTrack" : ""}`}
                        style={
                            props.data.listType === "albüm"
                                ? { gridTemplateColumns: '16px 1fr 38px' }
                                : {}
                        }
                    >
                        <div
                            className={styles.playBtn}
                            onClick={() => props.changePlay(!props.isPlaying)}
                        >
                            {thisSong
                                ? <Icons.Pause />
                                : <Icons.Play />
                            }
                        </div>

                        {thisSong
                            ? <img className={styles.gif} src={Playgif} alt=""/>
                            : <p className={styles.SongIndex}>{props.data.index}</p>
                        }

                        {props.data.listType === "albüm" ? "" : <img src={props.data.song.image} alt=""/>}

                        <span>
                            <TextBoldL>{unEscape(props.data.song.title)}</TextBoldL>
                            <TextRegularM>{data[Object.keys(data)[0]]?.singers}</TextRegularM>
                        </span>

                        <p>{convertTime(data[Object.keys(data)[0]]?.duration)}</p>
                    </div>
                </button>
            )}
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        isPlaying: state.isPlaying,
        trackData: state.trackData
    };
};

export default connect(mapStateToProps, { changeTrack,changePlay })(PlaylistTrackIncomplete);