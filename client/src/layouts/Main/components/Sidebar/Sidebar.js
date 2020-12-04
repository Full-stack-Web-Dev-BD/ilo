import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FeedbackIcon from '@material-ui/icons/Feedback';
import UpdateIcon from '@material-ui/icons/Update';
import { SidebarNav } from './components';
import { connect } from 'react-redux';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  const {user}=props.auth
  const classes = useStyles();


  const pages = [
    {
      title: 'Algorithm ',
      href: '/home',
    },
    {
      title: 'Machine Learning  ',
      href: '/create',
    },
    {
      title: 'System  ',
      href: '/library',
    },
    {
      title: 'Javascript',
      href: '/upgrade',
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
          <SidebarNav
            className={classes.nav}
            pages={pages}
          />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};
const mapStateToProps=state=>({
  auth:state.auth
})
export default connect(mapStateToProps,null)(Sidebar);
