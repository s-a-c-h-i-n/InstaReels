import React, { useEffect } from 'react'
import {auth} from '../../firebase'
import {useState} from "react"
import {onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'


export const AuthContext = React.createContext()

function AuthWrapper({children}) {


const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)

useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
        if(user){
            setUser(user)
        }
        else{
          setUser('')
        }
    })
 
    setLoading(false);
},[])

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout(){
    return signOut(auth);
  }

  function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const store = {
    login,
    user,
    logout,
    signup
  }
  return (
    <AuthContext.Provider value={store}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper