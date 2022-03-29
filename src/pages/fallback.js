import React from 'react'
import useViewport from '../hooks/useViewport';
import Topnav from '../component/topnav/topnav';

export default function Fallback({ type }) {

    var { width } = useViewport();
    // var search_term = query.get("q");
    if (width < 780) {
        var padtop = '23%';
    } else {
        var padtop = '5%';
    }

    return (
        <div>
            <Topnav tabButtons={true} />

            <div style={{ padding: '5%', paddingTop: padtop,color:'white'}}>


                {type === '404' && (<div>
                    <h1>⚠</h1>
                    <br />
                    <h2>Not Found 404</h2>
                    <br />

                    <p>Requested Page Could Not Be Found.</p>
                    <br />
                </div>)}



                {type === '201' && (<div>
                    <h1>⚠</h1>
                    <br />

                    <h2>No connection to the internet</h2>
                    <br />

                    <p>This Display has a connection to your network but no connection to the internet.</p>
                    <p class="desc">The connection to the outside world is needed for updates and keeping the time.</p>
                </div>)}


            </div>
        </div>

    )
}