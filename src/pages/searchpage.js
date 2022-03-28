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
import { SEARCHCARDS } from '../data/index';



function SearchPage(props) {
    // var { query: search_term } = useParams();

        // var { query: search_term } = useParams();
        const location = useLocation();

    var [searchTerm,setStateTerm] = useState(new URLSearchParams(location.search).get("query"));

    const [data, setData] = useState(null);
    const [loading, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setStateTerm(new URLSearchParams(location.search).get("query"));
        const abortCont = new AbortController();
        fetch(`https://crosdev.herokuapp.com/https://www.jiosaavn.com/api.php?${endpoints.searchBaseUrl}${encodeURIComponent(new URLSearchParams(location.search).get("query"))}`, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('Could Not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                console.log(data);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
            });

        // abort the fetch
        return () => abortCont.abort();
    }, [location])

	const [playlistIndex, setPlaylistIndex] = useState(undefined);

    
    if(!searchTerm){
        return (

    
                <div className={`${styles.Search} ${stylesa.Home}`}>
                    <TitleM>Search</TitleM>
                    <div className={styles.SearchCardGrid}>
                        {SEARCHCARDS.map((card) => {
                            return (
                                <SearchPageCard 
                                    key={card.title}
                                    cardData={{
                                        bgcolor: card.bgcolor,
                                        title: card.title,
                                        imgurl: card.imgurl,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
        );
    }






    
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
        window.localStorage.setItem("playLists",JSON.stringify([...data?.playlists.data,...data?.albums.data,jsond])
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





            <div className={styles.Search}>
                <TitleM>Search {`For ${searchTerm}`}</TitleM>

                    <div style={{ padding: '5%' }}>
                    

                        {data && 
                        
                        <div className='theBoontySearches'>

                            <div className={stylesa.SectionTitle}>
                            <div className={stylesa.SectionCardsMedium} style={{overflowY:'inherit!important'}}>

                            {data?.playlists.data.map((item) => {
                                    item.hoverColor = generateRGBGrad();
                                    item.image = item.image.replace('50x50','500x500');
                                    return (
                                        <PlaylistCardM
                                            key={item.id}
                                            data={item}
                                        />
                                    );

                                })}


                             {data?.albums.data.map((item) => {
                                    item.hoverColor = generateRGBGrad();
                                    item.image = item.image.replace('50x50','500x500');
                                    return (
                                        <PlaylistCardM
                                            key={item.id}
                                            data={item}
                                        />
                                    );

                                })}
                            </div>
                            </div>



                            {/* <div onLoad={() => {
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
                            </div> */}



                        </div>
                        
                        }



                        {loading && <SkeletonPage />}
                        {error && <div className='Category__subtitle'>Oops, an error occurred.</div>}
                        {data && data.error && <div className='Category__subtitle'>{data.error}</div>}


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
