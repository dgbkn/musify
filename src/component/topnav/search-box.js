import * as Icons from '../icons';
import styles from './search-box.module.css';
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import useOutsideClick from '../../hooks/useOutsideClick';

import { motion } from "framer-motion";
import { useEffect } from 'react';




function SearchBox({onChange,searchval}) {
    const history = useHistory();
    const [searchInputToggle, setSearchInputToggle] = useState(false);
    const [searchInput, setSearchInput] = useState(searchval);
    const searchbarRef = useRef();
    const searchInputRef = useRef();

    useOutsideClick(searchbarRef, () => {
        if (searchInputToggle) {
            setSearchInput("");
            setSearchInputToggle(false);
        }
    });



    const handleSearchInput = event => {
        const { value } = event.target;
        setSearchInput(value);
        
        if (value.length > 0) {
            history.push(`/search?query=${encodeURIComponent(value)}`);
        } else { history.push(`/search/`);}
    };

    return (
        <motion.div
        // style={{marginTop:'20px'}}
        initial={{ x: -100 }}
        animate={{ x:0 }} className={styles.SeachBox} ref={searchbarRef}>
            <Icons.Search />
            <input autoFocus id="searchBoxInput" placeholder="Search for any music,playlist or artist" maxLength="80" type={"text"}  
                value={searchInput}
                onChange={handleSearchInput}
                ref={searchInputRef}
                />


</motion.div>



    );
}
  
export default SearchBox;
