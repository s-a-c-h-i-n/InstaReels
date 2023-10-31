import React, { useContext, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from "react"
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthWrapper';
import {useNavigate} from "react-router-dom"

function LoginForm() {

const navigate = useNavigate();

const [email, setEmail]=useState("");

const [password, setPassword]=useState("");

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);

const {login, user} = useContext(AuthContext)

const handleClick = async() =>{
  try{
    setLoading(true);
    setError('');
    await login(email, password)
    console.log("Logged In!")
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


  return (
    <div>
    <Card sx={{ minWidth: 360 }}
    style={{
      border:"2px solid lightgray"
    }}>
      <CardContent>
        <center>
      <img src="instragramtext.png"
      height="80px"></img>
      </center>
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
        {
          error != '' &&
          <div style={{ color:"red"}}>{error}</div>
        }

      </div>
      <Button 
      variant="contained"
      fullWidth
      onClick={handleClick}
      disabled={loading}
      >Login</Button>
      </CardContent>
    </Card>

    <Card sx={{ minWidth: 360, marginTop: "1rem" }}
    style={{
      border:"2px solid lightgray"
    }}>
    <CardContent>
      Don't have an account?
      <Button variant="text">
        <Link to="/signup">Sign Up</Link></Button> 
    </CardContent>

    </Card>
    </div>
  )
}

export default LoginForm