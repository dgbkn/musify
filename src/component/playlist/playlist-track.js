import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import TextBoldL from "../text/text-bold-l";
import TextRegularM from "../text/text-regular-m";
import Playgif from '../../image/now-play.gif';
import * as Icons from '../icons';
import convertTime from '../../functions/convertTime';
import styles from "./playlist-track.module.css";
import { useHistory } from "react-router-dom";

function PlaylistTrack(props) {
    const [thisSong, setthisSong] = useState(false);

    const history = useHistory();
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
                onClick={
                    () => 
                    {
                        if( "media_preview_url" in props.data.song ){
                        props.changePlay(!props.isPlaying);
                        }else{
                            history.push(`/playtrack/${props.data.song.id}`);
                        }
                    }
                
                }
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

			<p>{convertTime(props.data.song.duration)}</p>
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