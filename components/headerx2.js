import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';


import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import  {Button} from 'react-bootstrap';



const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {

    

  const classes = useStyles();
    
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button variant="outlined" size="small"> Subscribe </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
         Andres
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
         
          <Link
            href="/b/showroom"
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}>
                <div > Missing/Kidnappings Persons? </div>
            </Link>

            <Link
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}>
                <div> Who we are? </div>
            </Link>

            <Link
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}>
                <div> FAQS </div>
            </Link>

            <Link
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}>
                <div> About </div>
            </Link>

            <Link
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}>
                <div> Volunteer </div>
            </Link>

            <Link
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
            href="/">
                <div> Events </div>
            </Link> 
          
      </Toolbar>
      
    </React.Fragment>
  );
}

