import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';

import { AnimatePresence } from "framer-motion";
import { changePlay } from './actions';

import useWindowSize from './hooks/useWindowSize';
import Sidebar from './component/sidebar/sidebar';
import MobileNavigation from './component/sidebar/mobile-navigation';
import Footer from './component/footer/footer';
import Home from './pages/home';
import Search from './pages/search';
import Library from './pages/library';
import PlaylistPage from './pages/playlist';
import Fallback from './pages/fallback';
import CONST from './constants/index';
// import { PLAYLIST } from './data/index';
import styles from './style/App.module.css';
import Searchpage from './pages/searchpage';
import Topnav from './component/topnav/topnav';
import PlayTrackPage from './pages/playtrackpage';


function App(props) {
  const size = useWindowSize();
  document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      props.changePlay(!props.isPlaying)    
    }
  }
  return (
        <Router>
        <div className={styles.layout}>
          {size.width > CONST.MOBILE_SIZE 
            ? <Sidebar /> 
            : <MobileNavigation />
          }

<AnimatePresence exitBeforeEnter>

          <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/library">
                <Library />
            </Route>
            {/* <Route exact path="/search/:query">
            <Searchpage />
          </Route>

          <Route path="/search">
                <Search />
            </Route> */}
            

          <Route path="/search">
          <div className={styles.SearchPage}>
                <Topnav search={true}/>
            <Searchpage />
            </div>
          </Route>
            
          <Route exact path="/playlist">
                <PlaylistPage />
            </Route>

                        
            <Route exact path="/playtrack/:path">
                <PlayTrackPage />
            </Route>

            <Route exact path="/fallback">
            <Fallback type={'201'} />
          </Route>

          <Route path="">
            <Fallback type={'404'} />
          </Route>

          <Route path="*">
            <Fallback type={'404'} />
          </Route>


          </Switch>
          </AnimatePresence>

          <Footer />
        </div>
      </Router>
  );
}

// export default App;

const mapStateToProps = (state) => {
	return {
		isPlaying: state.isPlaying,
        trackData: state.trackData
	};
};
  
export default connect(mapStateToProps, { changePlay })(App);