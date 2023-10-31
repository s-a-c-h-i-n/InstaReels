import {React, useContext, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import './signup.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthWrapper';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage, db} from '../../../firebase'
import { doc, setDoc, Timestamp } from "firebase/firestore";

function SignUp() {

const navigate = useNavigate();

const [email, setEmail]=useState("");

const [password, setPassword]=useState("");

const [name, setName]=useState("");

const [file, getFile]=useState(null);

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);

const {signup, user} = useContext(AuthContext)

const handleClick = async() =>{
  try{
    setLoading(true);
    setError('');
    const user = await signup(email, password)
    console.log("Sign Up Successfully!")

    const storageRef = ref(storage, `${user.uid}/Profile`);

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
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);

      let obj = {
        name : name,
        email : email,
        uid : user.user.uid,
        photoURL : downloadURL,
        posts:[]
      }

      await setDoc(doc(db,"users",user.user.uid),obj)
      console.log("doc added")
    });
  }
);


  }catch(err){
    console.log(err)
    setError(err.message);
    setTimeout(()=>{
      setError('');
    }, 2000)
  }
  setLoading(false)
}

useEffect(()=>{
  if(user){
    navigate("/")
  }
  else{
    console.log("Not Logged In!")
  }
},[user])

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

  return (
    <div className='signup_container'>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <center><img src="instragramtext.png"
      height="80px"></img></center>
      
      
      <p> Signup to see photos and videos from your friends</p>
      <div>
      <TextField 
      type="email"
      id="outlined-basic" 
      label="Email" 
      variant="outlined"
      margin="normal"
      fullWidth="true"
      value={email}
      onChange={(e)=>{setEmail(e.target.value)}} />
      </div>

      <div>
      <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth="true"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />

      </div>

      <div>
      <TextField 
      type="text"
      id="outlined-basic" 
      label="Full Name" 
      variant="outlined"
      margin="normal"
      fullWidth="true"
      value={name}
      onChange={(e)=>{setName(e.target.value)}} />
      </div>

      <Button 
      variant="outlined"
      color='error'
      component="label"
      startIcon={<CloudUploadIcon />}
      fullWidth
      style={{
        marginBottom:"10px"
      }}

      onChange={(e)=>{getFile(e.target.files[0])}}
      >Upload profile Image
      <VisuallyHiddenInput type="file" />
      </Button>
      
      <Button 
      variant="contained"
      onClick={handleClick}
      fullWidth
      disabled={loading}
      >Sign Up</Button>
      </CardContent>
    </Card>

    <Card sx={{ minWidth: 275, marginTop: "1rem" }}>
    <CardContent>
      Have an account?
      <Button variant="text">
        <Link to="/login">Login</Link></Button> 
    </CardContent>

    </Card>
    </div>
  )
}

export default SignUp