import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { changeTrack, changePlay } from '../actions';
import Topnav from '../component/topnav/topnav';
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from '../component/buttons/play-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/playlist-details';
import PlaylistTrack from '../component/playlist/playlist-track';
import * as Icons from '../component/icons';
import { PLAYLIST } from "../data/index";
import gradient from 'random-gradient'

import TitleS from '../component/text/title-s';
import TextBoldM from '../component/text/text-bold-m';

import stylesplaylist from "../component/playlist/playlist-details.module.css";

import styles from './playlist.module.css';
import { useEffect, useState } from 'react';
import SkeletonPage from "../component/SkeletonPage/SkeletonPage";

import { generateRGBGrad } from '../utils';


import useFetch from '../hooks/useFetch';
import endpoints from '../endpoints';


function PlayTrackPage(props) {
	const [playlistIndex, setPlaylistIndex] = useState(undefined);
	
	const [playUrl, setplayUrl] = useState("");


	const { path } = useParams();

	var { loading, error, data: results } = useFetch(endpoints.songDetailsBaseUrl, path);

	function changeBg(color) {
		document.documentElement.style.setProperty('--hover-home-bg', color);
	}




	useEffect(() => {
		if (results && "encrypted_media_url" in  results[Object.keys(results)[0]]  ) {

		var dfd = results[Object.keys(results)[0]]?.encrypted_media_url;
		
		  var uri=  endpoints.BASE_API_URL  +  endpoints.getDecrptedUrl( dfd );

		  fetch(uri)
		  .then(res => {
			  if (!res.ok) { // error coming back from server
				  console.log('Could Not fetch the data for that resource');
				  return "";
			  }
			  return res.json();
		  })
		  .then(data => {
			setplayUrl(data.auth_url);
		  })
		  .catch(err => {
			  if (err.name === 'AbortError') {
				  console.log('fetch aborted');
			  } else {
				console.log(err);
			  }
		  });

		}
	
	}, [results]);


	useEffect(() => {
		if (playUrl) {
			var sss = results[Object.keys(results)[0]];
			sss.media_preview_url = playUrl;
			window.localStorage.setItem("currentTracksinPlayLists", JSON.stringify([ sss ])
			);
			props.changeTrack([JSON.parse(window.localStorage.getItem("playLists")), 0]
			);
			
			try{
			 props.changePlay(true);
			}catch(e){
				console.log(e);
			}
		}
	
	}, [playUrl]);


    changeBg(generateRGBGrad());





	return (
		<>

			{loading && !playUrl &&
				<>  <SkeletonPage />
				</>

			}

			{error && <div className="errored">Oops, an error occurred.</div>}

			{!loading && results && playUrl && (
                <center>
				<div className={styles.PlaylistPage}>
					<div className={styles.gradientBg}></div>
					<div className={styles.gradientBgSoft}></div>
					<div className={styles.Bg}></div>

					<Topnav />


                    <div className={styles.playlistDetails}>
            <div className={styles.imgBox}>
                <img src={results[`${path}`].image} />
            </div>
            <div className={styles.textBox}>
                <TitleS>{"Track"}</TitleS>
                <h1>{results[`${path}`].song}</h1>
                <div className={styles.primary_artists}>
                    <TextBoldM>{results[`${path}`].singers}</TextBoldM>
                </div>
            </div>


            <div className={styles.PlaylistIcons}>
										<button
											onClick={() => {
												// props.changeTrack([JSON.parse(window.localStorage.getItem("playLists")), 0]);
												props.changePlay(!props.isPlaying);
											}
											}
										>
											<PlayButton isthisplay={props.isPlaying} />
										</button>

										<IconButton icon={<Icons.Like />} activeicon={<Icons.LikeActive />} />

										<Icons.More className={styles.moreIcon} />
									</div>



        </div>



				</div>
                </center>
			)}
		</>
	);
}



const mapStateToProps = (state) => {
	return {
		isPlaying: state.isPlaying,
		trackData: state.trackData,
	};
};

export default connect(mapStateToProps, { changeTrack, changePlay })(PlayTrackPage);
