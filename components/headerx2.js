import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';


import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import  {Modal, Form, Button} from 'react-bootstrap';

import Upload from "./uploader"

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Report a Missing Person and  we handle from here! 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicUpload">
            <Form.Label>Upload a Photo</Form.Label>
            <Upload />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }





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
  const [modalShow, setModalShow] = React.useState(false);

    

  const classes = useStyles();
    const {  title } = props;

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
          {title}
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
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}>
                <div onClick={() => setModalShow(true)}> Missing/Kidnappings Persons? </div>
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
      <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
