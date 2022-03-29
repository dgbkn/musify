import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TitleM from '../component/text/title-m';
import Topnav from '../component/topnav/topnav';
import PlaylistCardM from '../component/cards/playlist-card-m'
import { PLAYLIST } from "../data/index";

import styles from "./library.module.css";

import SkeletonPage from "../component/SkeletonPage/SkeletonPage";


import useFetch from '../hooks/useFetch';
import endpoints from '../endpoints';
import axios from "axios";
import { useState ,useEffect} from "react";
import RadioCard from "../component/cards/radio-card";


function Library() {

    return (
        <div className={styles.LibPage}>
            <Topnav tabButtons={true} />
            <div className={styles.Library}>
                <Route exact path="/library"><PlaylistTab /></Route>
                <Route path="/library/podcasts"><PodcastTab /></Route>
                <Route path="/library/charts"><ChartsTab /></Route>
                <Route path="/library/artists"><ArtistTab /></Route>
                <Route path="/library/radio"><RadioTab /></Route>
            </div>
        </div>
    );
}

function PlaylistTab() {
    var { loading, error, data: results } = useFetch(endpoints.homenewPlaylists);

    if (results) {
        window.localStorage.setItem("playLists", JSON.stringify(results.data)
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



                <div>
                    <TitleM>Playlists</TitleM>
                    <div className={styles.Grid}>
                        {results?.data.map((item) => {
                            return (
                                <PlaylistCardM
                                    key={item.title}
                                    data={item}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}



function ChartsTab() {
    var { loading, error, data: results } = useFetch(endpoints.homegetCharts);

    if (results) {
        window.localStorage.setItem("playLists", JSON.stringify(results)
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



                <div>
                    <TitleM>Charts</TitleM>
                    <div className={styles.Grid}>
                        {results?.map((item) => {
                            return (
                                <PlaylistCardM
                                    key={item.title}
                                    data={item}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}



function PodcastTab() {


    var { loading, error, data: results } = useFetch(endpoints.getPodcasts);

    if (results) {
        window.localStorage.setItem("playLists", JSON.stringify(results.data)
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

                <div>
                    <TitleM>Podcasts</TitleM>
                    <div className={styles.Grid}>
                        {results?.data.map((item) => {
                            return (
                                <PlaylistCardM
                                    key={item.title}
                                    data={item}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

function ArtistTab() {
    var { loading, error, data: results } = useFetch(endpoints.getArtists);

    if (results) {
        window.localStorage.setItem("playLists", JSON.stringify(results.top_artists.map((item) => {

            item.type = "artist";
            item.title = item.name;
            item.subtitle = `Followers: ${item.follower_count}`;
            item.id = item.perma_url.split('/');
            item.id = item.id[item.id.length - 1];

            return item;

        })));
    }


    return (
        <>
            {loading &&
                <>  <SkeletonPage />
                </>

            }
            {error && <div className="errored">Oops, an error occurred.</div>}

            {!loading && results && (

                <div>
                    <TitleM>🎭 Artists</TitleM>
                    <div className={styles.Grid}>
                        {results?.top_artists.map((item) => {
                            item.type = "artist";
                            item.title = item.name;
                            item.subtitle = `Followers: ${item.follower_count}`;
                            item.id = item.perma_url.split('/');
                            item.id = item.id[item.id.length - 1];
                            return (
                                <PlaylistCardM
                                    key={item.title}
                                    data={item}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}



function RadioTab() {


    var { loading, error, data: results } = useFetch(endpoints.getRadios);



    if (results) {
        window.localStorage.setItem("playLists", JSON.stringify(results)
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

                <div>
                    <TitleM>Radios</TitleM>
                    <div className={styles.Grid}>
                        {results?.map((item) => {
                                return (
                                <RadioCard
                                    key={item.title}
                                    data={item}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default Library;
