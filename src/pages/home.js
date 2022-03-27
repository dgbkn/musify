import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import PlaylistCardM from '../component/cards/playlist-card-m';
import SkeletonPage from "../component/SkeletonPage/SkeletonPage";
import useFetch from '../hooks/useFetch';
import endpoints from '../endpoints';
import {generateRGBGrad} from '../utils';
import styles from "./home.module.css";


import { PLAYLIST } from '../data/index'

function Home() {

    var { loading, error, data: results } = useFetch(endpoints.homenewPlaylists);

    if(results){
        window.localStorage.setItem("playLists",JSON.stringify(results.data)
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


                <div className={styles.Home}>
                    <div className={styles.HoverBg}></div>
                    <div className={styles.Bg}></div>

                    <Topnav />
                    <div className={styles.Content}>
                        <section>
                            <div className={styles.SectionTitle}>
                                <TitleL>Namaste 🙏</TitleL>
                            </div>

                            <div className={styles.SectionCards}>
                                {results?.data.map((item) => {
                                 item.hoverColor = generateRGBGrad();
                                 return (
                                        <PlaylistCardS
                                            key={item.id}
                                            data={item}
                                        />
                                    );
                                })}
                            </div>
                        </section>

                        <section>
                            <div className={styles.SectionTitle}>
                                <TitleM>Welcome 🤗 To My Spotify</TitleM>
                            </div>

                            <div className={styles.SectionCardsMedium}>
                                {results?.data.map((item) => {
                                 item.hoverColor = generateRGBGrad();
                                    return (
                                        <PlaylistCardM
                                            key={item.id}
                                            data={item}
                                        />
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </div>)}


        </>
    );
}

export default Home;
