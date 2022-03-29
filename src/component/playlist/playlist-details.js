import TitleS from '../text/title-s';
import TextBoldM from '../text/text-bold-m';

import styles from "./playlist-details.module.css";

function PlaylistDetails({data}) {
	return (
        <div className={styles.playlistDetails}>
            <div className={styles.imgBox}>
                <img src={data.image ? data.image : 'https://images.news18.com/ibnlive/uploads/2020/09/1601470124_untitled-design-24.jpg?im=FitAndFill,width=500,height=500'} />
            </div>
            <div className={styles.textBox}>
                <TitleS>{data.type}</TitleS>
                <h1>{data.title}</h1>
                <div className={styles.Artist}>
                    <figure>
                        <img src={data.image} />
                    </figure>
                    <TextBoldM>{data.subheading}</TextBoldM>
                </div>
            </div>
        </div>
	);
}

export default PlaylistDetails;
