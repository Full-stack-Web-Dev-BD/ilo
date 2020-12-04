import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Avatar, Button, Input } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { logoutUser } from '../../../../actions/authActions'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    cursor: 'pointer'
  }
}));

const Topbar = props => {
  const { className, logoutUser, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  }
  const logout = () => {
    window.localStorage.removeItem('jwtToken')
    window.location.href = "/"
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {/* logo placement */}
        <RouterLink to="/home" style={{ color: 'white' }}> <Button color="primary"> <span style={{ color: 'white' }}> Home</span></Button> </RouterLink>
        <RouterLink to="/hot" style={{ color: 'white' }}> <Button color="primary"> <span style={{ color: 'white' }}> Hot</span></Button> </RouterLink>
        <input />
        <div className={classes.flexGrow} />
        {
          props.auth.user ?
            <Hidden mdDown><Button variant="contained" color="secondary" onClick={e=>{logout()}}>Log Out</Button></Hidden> :
            <Hidden mdDown>
              <RouterLink to="/" style={{ color: 'white' }}> <Button color="primary"> <span style={{ color: 'white' }}> Login</span></Button></RouterLink>
              <RouterLink to="/sign-up" style={{ color: 'white' }}> <Button color="primary"> <span style={{ color: 'white' }}> Register</span></Button> </RouterLink>
            </Hidden>
        }
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  Topbar
);