import { useLocation, useHistory } from 'react-router';
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

import styles from './playlist.module.css';
import { useEffect, useState } from 'react';
import SkeletonPage from "../component/SkeletonPage/SkeletonPage";

import { generateRGBGrad } from '../utils';


import useFetch from '../hooks/useFetch';
import endpoints from '../endpoints';
import Fallback from './fallback';
import PlaylistTrackIncomplete from '../component/playlist/playlist_track_incomplete';


function PlaylistPage(props) {
	const [playlistIndex, setPlaylistIndex] = useState(undefined);
	const [isthisplay, setIsthisPlay] = useState(false);

	const location = useLocation();
	const history = useHistory();


	var id_Item = new URLSearchParams(location.search).get("id");
	var type = new URLSearchParams(location.search).get("type");
	var radioStation = new URLSearchParams(location.search).get("defaultStation");

	var fetch_id = radioStation ? radioStation : id_Item;

	var { loading, error, data: results } = useFetch(endpoints.getEndpointofTypeofContent(type), fetch_id);

	useEffect(() => {
		setIsthisPlay(playlistIndex === props.trackData.trackKey[0])
	})


	if (!type || !id_Item) {
		return (
			<Fallback type={`404`} />
		);
	}


	// var { loading, error, data: results } = useFetch(type == "playlist" ? endpoints.playlistDetailsBaseUrl:endpoints.albumDetailsBaseUrl, id_Item);



	function changeBg(color) {
		document.documentElement.style.setProperty('--hover-home-bg', color);
	}



	function getSongsFromData(data) {


		console.log("DASTA",data)
		switch (type) {
			case 'album':
				return data.songs;
			case 'show':
				return data.episodes;
			case 'playlist':
				return data.songs;
			case 'artist':
				return data.topSongs;
			case 'radio_station':
				delete data.stationid;
				console.log("DASTA SONGS",data)

				return Object.entries(data).map((i)=> {return i.song});
			default:
				return data.songs;
		}
	}

	if (results) {
		console.log(getSongsFromData(results), 'SONGS DATA @')
	}



	if (results) {
		window.localStorage.setItem("currentTracksinPlayLists", JSON.stringify(getSongsFromData(results))
		);
	}


	if (results) {
		window.localStorage.setItem("currentplaylist", JSON.stringify(results)
		);
	}



	return (
		<>

			{loading &&
				<>  <SkeletonPage />
				</>

			}
			{error && <div className="errored">Oops, an error occurred.</div>}

			{!loading && results && (
				<div className={styles.PlaylistPage}>
					<div className={styles.gradientBg}></div>
					<div className={styles.gradientBgSoft}></div>
					<div className={styles.Bg}></div>

					<Topnav />

					{JSON.parse(window.localStorage.getItem("playLists")).map((item) => {
						if (item.id == id_Item) {
							return (
								<div key={item.title} onLoad={() => {
									// changeBg(item.playlistBg);
									changeBg(generateRGBGrad());
									setPlaylistIndex(JSON.parse(window.localStorage.getItem("playLists")).indexOf(item))
								}}>

									<PlaylistDetails data={item} />

									<div className={styles.PlaylistIcons}>
										<button
											onClick={() => {
												props.changeTrack([JSON.parse(window.localStorage.getItem("playLists")), 0]);
												props.changePlay(true);

											}
											}
										>
											<PlayButton isthisplay={isthisplay} />
										</button>

										<IconButton icon={<Icons.Like />} activeicon={<Icons.LikeActive />} />

										<Icons.More className={styles.moreIcon} />
									</div>

									<div className={styles.ListHead}>
										<TextRegularM>#</TextRegularM>
										<TextRegularM>Track Name</TextRegularM>
										<Icons.Time />
									</div>

									<div className={styles.PlaylistSongs}>


										{getSongsFromData(results).map((song) => {


                                          
											song.link = song.media_preview_url?.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_320');
											if("song" in song){
											
											return (

												

												<button
													key={song.id}
													onClick={() => {
														if ("media_preview_url" in song) {

															props.changeTrack([JSON.parse(window.localStorage.getItem("playLists")), getSongsFromData(results).indexOf(song)]);
															props.changePlay(true);
														}
														else {
															history.push(`/playtrack/${song.id}`);
														}

													}}
													className={styles.SongBtn}
												>
													<PlaylistTrack
														data={{
															listType: item.type,
															song: song,
															index: getSongsFromData(results).indexOf(song) + 1
														}}
													/>
												</button>


											);
									}else{
										return (

											<PlaylistTrackIncomplete
											data={{
												listType: 'PLAYLIST',
												song: song,
												index: getSongsFromData(results).indexOf(song) + 1
											}}
										/>

										);
									}



										}

										
										
										)}
									</div>
								</div>
							);
						}
					})}
				</div>
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

export default connect(mapStateToProps, { changeTrack, changePlay })(PlaylistPage);
