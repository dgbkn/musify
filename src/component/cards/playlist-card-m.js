import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { changeTrack } from '../../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';

import styles from "./playlist-card-m.module.css";

function PlaylistCardM(props) {
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		setIsthisPlay(parseInt(props.data.id) === props.trackData.trackKey[0])
	})

	return (
		<div className={styles.PlaylistCardSBox}>
			<Link to={`/playlist/?id=${props.data.id}&type=${props.data?.type}`}>
				<div className={styles.PlaylistCardS}>
					<div className={styles.ImgBox}>
						<img src={props.data.image ? props.data.image : 'https://images.news18.com/ibnlive/uploads/2020/09/1601470124_untitled-design-24.jpg?im=FitAndFill,width=500,height=500'} alt={props.data.title} />
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
	);
}

const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
		isPlaying: state.isPlaying
	};
};
  
export default connect(mapStateToProps, { changeTrack })(PlaylistCardM);
