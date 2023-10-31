import React, { useState } from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import {v4 as uuidv4} from 'uuid';
import { arrayUnion, serverTimestamp } from 'firebase/firestore';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import {storage, db} from '../../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LinearProgress from '@mui/material/LinearProgress';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function UploadReels({userData}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if(file==null){
      setError("Please select a file")
      setTimeout(() => {
        setError('')
      }, 2000)
      return;
    }

    if((file.size / (1024*1024)) > 70){
      setError("Please select a smaller file")
      setTimeout(() => {
        setError('')
      }, 2000)
      return;
    }

    let uid = uuidv4();
    setLoading(true);

    const storageRef = ref(storage, `${userData.uid}/posts/${uid}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(progress)
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error)
    setError(error.message)
      setTimeout(() => {
        setError('')
      }, 2000)
      return;
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);

      let obj = {
        likes:[],
        postId: uid,
        postUrl: downloadURL,
        profileName: userData.name,
        profileUrl: userData.photoURL,
        uid: userData.uid,
        timestamp: serverTimestamp()
      }

      console.log(obj)
      await setDoc(doc(db,"posts",uid),obj)
      console.log("Post added in post collection")

      await updateDoc(doc(db, "users", userData.uid), {
        posts: arrayUnion(uid)
      })   
      console.log("doc added")
      setLoading(false)
    });
  }
);
  }

  return (
    <div className="upload_container">
      {
        error != ' ' ?
        <Alert severity="error">This is an error alert — check it out!</Alert>
        :
        <Button 
      variant="outlined"
      color='error'
      component="label"
      startIcon={<MovieIcon />}
      fullWidth
      style={{
        marginBottom:"10px",
        fontWeight:500
      }}
      >Upload Reels
      <VisuallyHiddenInput type="file" accept='video/*' 
      onChange={handleChange} />
      </Button>

      }
      {
        loading && 
        <LinearProgress variant="determinate" value={progress} style={{marginBottom:"10px", marginTop:"0.2rem"}}/>
      }

    
    </div>
  )
}

export default UploadReels