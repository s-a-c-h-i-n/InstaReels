import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/AuthWrapper';
import {useNavigate} from "react-router-dom"

const pages = [];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar({userData}) {

  const navigate = useNavigate();
  const {logout} = useContext(AuthContext)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout= async()=>{
    console.log('Clicked!')
    await logout();
    navigate("/login")
  }

  return (
    <AppBar position="static" style={{ backgroundColor:"white"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navbar_container">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: {md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="instragramtext.png" height="50px" onClick={event =>  window.location.href='/'}></img>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
        
          </Box>
          <Box sx={{ flexGrow: 0}} style={{ display:"flex"}}>
            <div className="nav_icons-container">
                <HomeIcon className="nav-icons" fontSize='large' onClick={event =>  window.location.href='/'}>
                </HomeIcon>
                <ExploreIcon className="nav-icons" fontSize='large'>
                </ExploreIcon>
            </div>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userData?.photoURL} />
                </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

                <MenuItem key={"Profile"} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link to="/profile">Profile</Link></Typography>
                </MenuItem>
                <MenuItem key={"Logout"} onClick={()=>{
                  handleLogout()
                  handleCloseUserMenu
                }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>  
    </AppBar>
  );
}
export default ResponsiveAppBar;
