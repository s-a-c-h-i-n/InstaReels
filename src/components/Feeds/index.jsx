import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import './navbar.css'
import UploadReels from './UploadReels'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../../context/AuthWrapper';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import {db} from '../../../firebase'
import Post from './Post';

function Feeds() {  
  const{user} = useContext(AuthContext)
  const[userData, setUserData] = useState({})
  const[posts, setPosts] = useState([])

  useEffect(() => {
    console.log(user.uid)
    const unsub = onSnapshot(doc(db,"users",user.uid), (doc) => {
      setUserData(doc.data())
    })

    return () => {
      unsub();
    }

  }, [user])

  useEffect(() => {
    
    const unsub = onSnapshot(query(collection(db,"posts"), 
    orderBy("timestamp", "desc")), (snapshot) => {
      let tempArray = []
      snapshot.docs.map((doc) => {
        tempArray.push(doc.data())
      })

      setPosts([...tempArray])
      console.log(tempArray)
    })

    return () => {
      unsub();
    }

  }, [])




  return (
    <div className="feed_container">
      <Navbar userData={userData}></Navbar>
      <UploadReels userData={userData}></UploadReels>

      <div className='reels_container'>
        {
          posts.map((post)=>(
            <Post postData={post} userDate={userData} />
          ))
        }
      </div> 
    </div>
  )


}

export default Feeds