import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../../context/AuthWrapper';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

function Post({postData, userData}) {
    
    const {user} = useContext(AuthContext)
    const [like, setLike] = useState(false) 

    useEffect(() => {
        if(postData.likes.includes(user.uid)){
            setLike(true)
        }
        else{
            setLike(false)
        }
    }, [postData])

    const handleLike = async() => {
        if (!like) {
            await updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayUnion(user.uid)
            })
        } else {
            await updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayRemove(user.uid)
            })
        }
    }

  return (
    <div className='post_container'>
          <video src={postData.postUrl} type="video/mp4" preload='auto' autoPlay loop muted></video>
          <div className='reels_info'>
            <div className='avatar_container'>
            <Avatar alt="Remy Sharp" src={postData.profileUrl} 
            sx={{
              margin:"0.5rem"
            }}/>
            <p style={{ color: "white" , fontWeight:"bold"}}>{postData.profileName}</p>
            </div>
            <div className='post_like'>
              <FavoriteIcon fontSize='large'
              style={ like? {color: "red"} : {color:"white"}}
              onClick={handleLike}></FavoriteIcon>
              <p style={{ margin:"0" , padding:"0"}}>{postData.likes.length > 0 && postData.likes.length}</p>
            </div>
          </div>
        </div>
  )
}

export default Post