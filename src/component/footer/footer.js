import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeTrack, changePlay } from '../../actions';
import useWindowSize from '../../hooks/useWindowSize';
import FooterLeft from './footer-left';
import MusicControlBox from './player/music-control-box';
import MusicProgressBar from './player/music-progress-bar';
import FooterRight from './footer-right';
import Audio from './audio';

import CONST from '../../constants/index';
import styles from "./footer.module.css";
import { getSongLink } from '../../utils';

function Footer(props){
    const size = useWindowSize();

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    const handleTrackClick = (position) => {
        audioRef.current.currentTime = position;
    };

    useEffect(() => {
        if (props.isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
    }, [audioRef, props.isPlaying]);

    /*useEffect(() => {
        if (props.isPlaying) {
          localStorage.setItem('playedSong', audioRef.current.currentSrc);
        } else {
          localStorage.setItem('playedSong', 'stop');
        }
    });*/

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [audioRef, volume]);

    
    useEffect(() => {
        audioRef.current.addEventListener('ended', async () => {
            var currentPlayList = window.localStorage.getItem("currentTracksinPlayLists");
            currentPlayList = JSON.parse(currentPlayList);
            console.log("DEVDATA",props.trackData,currentPlayList,props.trackData.trackKey[1]);

            if(props.trackData.trackKey[1] === currentPlayList.length-1){
                var linkZero = await getSongLink(currentPlayList[0].song.id);
                props.changeTrack([currentPlayList, 0,linkZero]);
            }else{
                props.trackData.trackKey[1]++;
                var linkNew = await getSongLink(currentPlayList[props.trackData.trackKey[1]].id);
                props.changeTrack([currentPlayList,props.trackData.trackKey[1],linkNew])
            }
        })
    },[]);

    return (
        <footer className={styles.footer}>
            <div className={styles.nowplayingbar}>
                <FooterLeft />
                <div className={styles.footerMid}>
                    <MusicControlBox />
                    <MusicProgressBar 
                        currentTime={currentTime} 
                        duration={duration} 
                        handleTrackClick={handleTrackClick}
                    />
                    <Audio
                        ref={audioRef}
                        handleDuration={setDuration}
                        handleCurrentTime={setCurrentTime}
                        trackData={props.trackData}
                        isPlaying={props.isPlaying}
                    />
                </div>
                {size.width > CONST.MOBILE_SIZE && 
                    <FooterRight 
                        volume={volume} 
                        setVolume={setVolume}
                    />
                }
            </div>
        </footer>
    );
}


const mapStateToProps = (state) => {
    return {
        trackData: state.trackData,
        isPlaying: state.isPlaying
    };
};
  
export default connect(mapStateToProps, { changeTrack, changePlay })(Footer);