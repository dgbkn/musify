import PrevPageBtn from '../buttons/prev-page-button';
import NextPageBtn from '../buttons/next-page-button';
import SearchBox from './search-box';
import LibraryTabBtn from './library-tab-btn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from "../../firebase";

import styles from './topnav.module.css';
import { signInWithGoogle } from '../../firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Topnav({search = false, tabButtons = false,searchval=""}) {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };


      useEffect(
        () => { 
            if(user){
                fetchUserName();
            }
        }, [user]);

    return (
      <nav className={styles.Topnav}>
          <div>
                <span>
                    <PrevPageBtn />
                    <NextPageBtn />
                    { search ? <SearchBox searchval={searchval}/> : '' }
                    { tabButtons ? <LibraryTabBtn /> : '' }
                </span>
                <span>
                <button className={styles.ProfileBtn}>
                        With ❤️ From India
                    </button>


                     {name !== "" ? <button className={styles.ProfileBtn} onClick={()=>{logout();setName("")}}> {name} (Logout) </button> : <button className={styles.ProfileBtn} style={{paddingLeft:"10px"}} onClick={()=>{signInWithGoogle()}}>
                        Sign in with Google
                    </button>
                    }
          
                </span>
          </div>
      </nav>
    );
}
  
export default Topnav;
