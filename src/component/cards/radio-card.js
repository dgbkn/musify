import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { changeTrack } from '../../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';


import useFetch from '../../hooks/useFetch';
import endpoints from '../../endpoints';


import PlayButton from '../buttons/play-button';

import styles from "./playlist-card-m.module.css";
import SkeletonElement from "../SkeletonElement/SkeletonElement";

function RadioCard(props) {
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		setIsthisPlay(parseInt(props.data.id) === props.trackData.trackKey[0])
	})

    var { loading, error, data } = useFetch(endpoints.getDefaultStationofRadio(props.data.more_info.language,props.data.id)); 


	return (
        <>
                    {loading &&
                <>  <SkeletonElement />
                </>

            }
            {error && <div className="errored">Oops, an error occurred.</div>}

            {!loading && data && (


		<div className={styles.PlaylistCardSBox}>
			<Link to={`/playlist/?id=${encodeURIComponent(props.data.id)}&defaultStation=${encodeURIComponent(data?.stationid)}&type=${props.data?.type}`}>
				<div className={styles.PlaylistCardS}>
					<div className={styles.ImgBox}>
						<img src={props.data.image} alt={props.data.title} />
					</div>
					<div className={styles.Title}>
						<TextBoldL>{props.data.title}</TextBoldL>
						<TextRegularM>{props.data.subtitle}</TextRegularM>
						<TextRegularM>{props.data.type}</TextRegularM>
					</div>
				</div>
			</Link>
			<div 
			//  onClick={() => props.changeTrack([parseInt(props.data.id), 0])} 
				className={`${styles.IconBox} ${isthisplay&&props.isPlaying ? styles.ActiveIconBox : ''}`}
			>
				{/* <PlayButton isthisplay={isthisplay} /> */}
			</div>
		</div>
            )}
        </>

	);
}

const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
		isPlaying: state.isPlaying
	};
};
  
export default connect(mapStateToProps, { changeTrack })(RadioCard);
