import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 2
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
       
        <Grid container justify="space-between">  
            <Typography inline variant='h5' align="left"> 
            <Link to="/landingpage" style={{ textDecoration: "none",color: "white", width: "100%" }}>
                   <HomeOutlinedIcon style={{fontSize:'2.5rem'}} />
            </Link>
            </Typography>
            
            <div inline align='right'>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"  
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{fontSize:'1.6rem'}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClick={handleClose}
              >
                <MenuItem  >
                <Link to="/" style={{ textDecoration: "none",color: "black", width: "100%" }}>
                   Home
                 </Link>
                </MenuItem>
                
                <MenuItem  >
                <Link to="/upload" style={{ textDecoration: "none",color: "black",width: "100%" }}>
                   Upload Post
                </Link>
                </MenuItem>
                
                <hr/>

                <MenuItem  >
                <Link to="/profile" style={{ textDecoration: "none",color: "black",width: "100%" }}>
                   My profile
                </Link>
                </MenuItem>
                
                <MenuItem  >
                <Link to="/display" style={{ textDecoration: "none",color: "black",width: "100%" }}>
                   My Blogs
                </Link>
                </MenuItem>
                                
                <MenuItem  >
                <Link to="/update" style={{ textDecoration: "none",color: "black",width: "100%" }}>
                   Update Profile
                </Link>
                </MenuItem>
                <MenuItem  >
                <Link to="/aboutus" style={{ textDecoration: "none",color: "black",width: "100%" }}>
                   About Us
                </Link>
                </MenuItem>

                <MenuItem onClick={(e) => localStorage.removeItem("token")}>
                <Link to="/" style={{ textDecoration: "none", color: "black", width: "100%" }}>
                   Log Out
                </Link>
                </MenuItem>
                
              </Menu>
            </div>
        </Grid>
        
        
        </Toolbar>
      </AppBar>
    </div>
  );
}
