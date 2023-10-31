import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Feeds/Navbar'
import './profile.css'
import { AuthContext } from '../../context/AuthWrapper'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'

function Profile() {

  const{user} = useContext(AuthContext)
  const[userData, setUserData] = useState({})
  const[posts, setPosts] = useState([])
  const[postIds, setPostIds] = useState([])

  useEffect(() => {
    console.log(user.uid)
    const unsub = onSnapshot(doc(db,"users",user.uid), (doc) => {
      setUserData(doc.data())
      setPostIds(doc.data().posts)
    })

    return () => {
      unsub();
    }

  }, [user])

  useEffect(() =>{
    let tempArray = []

    postIds.map(async(postid,idx) => {
      const unsub = onSnapshot(doc(db,"posts", postid), (doc) =>{
        tempArray.push(doc.data())
        console.log("TempArray "+tempArray)
        setPosts([...tempArray])
      })
    })
  }, [postIds])

  return (
    <>
      <Navbar />
      <div>
        <div className='profile_upper'>
          <img src={userData?.photoURL} style={{height:'8rem', width:'8rem', borderRadius:'50%'}}></img>

          <div style={{ flexBasis:"40%", minWidth:"40%"}}>
            <h1> {userData?.name} </h1>
            <h3> Posts: {userData?.posts?.length}</h3>
          </div>
        </div>
        <hr />
        <div className='profile_reels'>
          {
            posts.map((post)=>(
              <video src={post.postUrl}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Profile