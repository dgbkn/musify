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

import styles from './playlist.module.css';
import { useEffect, useState } from 'react';
import SkeletonPage from "../component/SkeletonPage/SkeletonPage";

import { generateRGBGrad } from '../utils';


import useFetch from '../hooks/useFetch';
import endpoints from '../endpoints';


function PlaylistPage(props) {
	const [playlistIndex, setPlaylistIndex] = useState(undefined);
	const [isthisplay, setIsthisPlay] = useState(false);
	const { path } = useParams();

	const currentItem = JSON.parse(window.localStorage.getItem("playLists")).map((item) => {
		if (item.id == path) { return item }
	});



	var { loading, error, data: results } = useFetch(currentItem.type === 'playlist' ? endpoints.playlistDetailsBaseUrl:endpoints.albumDetailsBaseUrl, path);


	function changeBg(color) {
		document.documentElement.style.setProperty('--hover-home-bg', color);
	}

	useEffect(() => {
		setIsthisPlay(playlistIndex === props.trackData.trackKey[0])
	})


	if (results) {
		window.localStorage.setItem("currentTracksinPlayLists", JSON.stringify(results?.songs)
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
						if (item.id == path) {
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
										{results?.songs.map((song) => {
											song.link = song.media_preview_url?.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_320');
											return (
												<button
													key={song.id}
													onClick={() => {
														props.changeTrack([JSON.parse(window.localStorage.getItem("playLists")), results?.songs.indexOf(song)]);
														props.changePlay(true);

													}}
													className={styles.SongBtn}
												>
													<PlaylistTrack
														data={{
															listType: item.type,
															song: song,
															index: results?.songs.indexOf(song) + 1
														}}
													/>
												</button>
											);
										})}
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
