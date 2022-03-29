import { useState, useEffect } from 'react';
import endpoints from '../endpoints';

// const BASE_API_URL = "https://thawing-scrubland-27252.herokuapp.com/api?uri=https://www.jiosaavn.com/api.php?";

const BASE_API_URL = endpoints.BASE_API_URL;


const useFetch = (part,query="") => {
    const [data, setData] = useState(null);
    const [loading, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        // fetch(`${BASE_API_URL}${encodeURIComponent(part)}${encodeURIComponent(query)}`, { signal: abortCont.signal })

        fetch(`${BASE_API_URL}${part}${encodeURIComponent(query)}`, { signal: abortCont.signal })
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
    }, [part,query])

    return { data, loading, error };
}

export default useFetch;