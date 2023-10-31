import React from 'react'
import CarouselApp from './CarouselApp'
import LoginForm from './LoginForm'
import Grid from '@mui/material/Unstable_Grid2';
import './login.css'

function index() {
  return (
    <div className='login_container'>
    {/* <h2>Login Page</h2> */}
      <CarouselApp></CarouselApp>
      <LoginForm></LoginForm>
    </div>
  )
}

export default index