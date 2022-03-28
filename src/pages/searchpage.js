import Topnav from '../component/topnav/topnav';
import TitleM from '../component/text/title-m'
import SearchPageCard from '../component/cards/searchpage-card';
// import { SEARCHCARDS } from '../data/index';
import useFetch from '../hooks/useFetch';
import styles from "./search.module.css";
import endpoints from '../endpoints';
import { useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
import SkeletonBasicPage from '../component/SkeletonBasicPage/SkeletonBasicPage';
import PlaylistCardM from '../component/cards/playlist-card-m';
import { generateRGBGrad } from '../utils';
import stylesa from "./home.module.css";
import PlayButton from '../component/buttons/play-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/playlist-details';
import PlaylistTrack from '../component/playlist/playlist-track';
import TextRegularM from "../component/text/text-regular-m";
import { changeTrack, changePlay } from '../actions';
import { connect } from 'react-redux';
import { useState } from 'react';
import * as Icons from '../component/icons';
import SkeletonPage from '../component/SkeletonPage/SkeletonPage';

function SearchPage(props) {
    var { query: search_term } = useParams();

    var { data, loading, error } = useFetch(endpoints.searchBaseUrl, search_term);

	const [playlistIndex, setPlaylistIndex] = useState(undefined);

    
    // useEffect(() => {
    //     console.log(data,"is data",data?.length)
    //     console.log(search_term)
    //     return () => {
            
    //     }
    // }, [data])

    

	function changeBg(color) {
		document.documentElement.style.setProperty('--hover-home-bg', color);
	}
    if(data){
        var jsond = {
            "id": "searchresults",
            "title": "Search results",
            "subtitle": "Just Updated",
            "type": "playlist",
            "image": "https://pics.freeicons.io/uploads/icons/png/7795702121539683258-512.png",
            "more_info": {
                "song_count": data?.songs?.data.length,
                "firstname": "JioSaavn",
                "follower_count": "7592",
                "last_updated": "1648364494",
                "uid": "phulki_user"
            },
            "explicit_content": "0",
            "mini_obj": true
        }
        window.localStorage.setItem("playLists",JSON.stringify({...data?.playlists.data,jsond})
        );
    }

    if(data){
        window.localStorage.setItem("currentTracksinPlayLists",JSON.stringify(data?.songs.data) 
        );
    }


    if(data){
        var jsond = {
            "id": "searchresults",
            "title": "Search results",
            "subtitle": "Just Updated",
            "type": "playlist",
            "image": "https://pics.freeicons.io/uploads/icons/png/7795702121539683258-512.png",
            "more_info": {
                "song_count": data?.songs?.data.length,
                "firstname": "JioSaavn",
                "follower_count": "7592",
                "last_updated": "1648364494",
                "uid": "phulki_user"
            },
            "explicit_content": "0",
            "mini_obj": true
        }

        window.localStorage.setItem("currentplaylist",JSON.stringify(jsond)
        );
    }



    return (
        <div className={styles.SearchPage}>
            <Topnav search={true} searchval={search_term} />

            <div className={styles.Search}>
                <TitleM>Search</TitleM>

                    <div style={{ padding: '5%' }}>
                        {/* 
                        {data && !data.error && data.length > 0 && data.map((e, i) => {

                            return (

                                <div id="main-row__under_category_flex" key={i}>

                                </div>
                            );
                        })} */}

                        {data && !data.error && data.length > 0 && <>


                            <div className={stylesa.SectionTitle}>
                                {data?.playlists.data.map((e) => {
                                    error.hoverColor = generateRGBGrad();
                                    return (
                                        <PlaylistCardM
                                            key={e.id}
                                            data={e}
                                        />
                                    );

                                })}
                            </div>


                            {/* {data.songs.map((e) => {

                            })} */}

                            <div onLoad={() => {
                                // changeBg(item.playlistBg);
                                changeBg(generateRGBGrad());
                                setPlaylistIndex(JSON.parse(window.localStorage.getItem("playLists")).indexOf(JSON.parse(window.localStorage.getItem("currentplaylist"))))
                            }}>


                                <div className={styles.ListHead}>
                                    <TextRegularM>#</TextRegularM>
                                    <TextRegularM>Track Name</TextRegularM>
                                    <Icons.Time />
                                </div>

                                <div className={styles.PlaylistSongs}>
                                    {data?.songs.data.map((song) => {
                                        song.link = song.media_preview_url?.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', '_320');
                                        return (
                                            <button
                                                key={song.id}
                                                onClick={() => {
                                                    props.changeTrack([JSON.parse(window.localStorage.getItem("playLists")), data?.songs.data.indexOf(song)]);
                                                    props.changePlay(true);

                                                }}
                                                className={styles.SongBtn}
                                            >
                                                <PlaylistTrack
                                                    data={{
                                                        listType: 'playlist',
                                                        song: song,
                                                        index: data?.songs.data.indexOf(song) + 1
                                                    }}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>



                        </>}
                        {loading && <SkeletonPage />}
                        {error && <div className='Category__subtitle'>Oops, an error occurred.</div>}
                        {data && data.error && <div className='Category__subtitle'>{data.error}</div>}


                    </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        isPlaying: state.isPlaying,
        trackData: state.trackData,
    };
};

export default connect(mapStateToProps, { changeTrack, changePlay })(SearchPage);
