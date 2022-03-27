import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import TextBoldL from "../text/text-bold-l";
import TextRegularM from "../text/text-regular-m";
import Playgif from '../../image/now-play.gif';
import * as Icons from '../icons';

import styles from "./playlist-track.module.css";

function PlaylistTrack(props) {
    const [thisSong, setthisSong] = useState(false);

    /*setInterval(function(){
        setthisSong(props.data.song.link == localStorage.getItem('playedSong'));
    }, 50);*/
    
    useEffect(() => {
        if(props.data.song.link === props.trackData.track && props.isPlaying === true){
            setthisSong(true)
        }else {
            setthisSong(false)
        }
	})


function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    htmlStr = htmlStr.replace(/&#39;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h+":": "";
    var mDisplay = m > 0 ? m +":": "00:";
    var sDisplay = s > 0 ? s + "" : "00";
    return hDisplay + mDisplay + sDisplay; 
}


	return (
		<div 
            className={`${styles.trackDiv} ${thisSong ? "activeTrack" : ""}`}
            style={
                props.data.listType === "albüm" 
                    ? {gridTemplateColumns: '16px 1fr 38px'} 
                    : {}
            }
        >   
            <button
                className={styles.playBtn}
                onClick={() => props.changePlay(!props.isPlaying)}
            >
                {thisSong 
                    ? <Icons.Pause /> 
                    : <Icons.Play />
                }
            </button>

            {thisSong 
                    ? <img className={styles.gif} src={Playgif} /> 
                    : <p className={styles.SongIndex}>{props.data.index}</p>
            }

			{props.data.listType === "albüm" ? "" : <img src={props.data.song.image} />}

			<span>
				<TextBoldL>{unEscape(props.data.song.song)}</TextBoldL>
				<TextRegularM>{props.data.song.singers}</TextRegularM>
			</span>

			<p>{secondsToHms(props.data.song.duration)}</p>
		</div>
	);
}


const mapStateToProps = (state) => {
	return {
		isPlaying: state.isPlaying,
        trackData: state.trackData
	};
};
  
export default connect(mapStateToProps, { changePlay })(PlaylistTrack);