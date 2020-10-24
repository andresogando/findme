import { listProducts as ListProducts } from "../src/graphql/queries";
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import  {Modal, Form, Button} from 'react-bootstrap';


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
          Persona Desaparecida
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nombre de la persona</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Edad</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group controlId="formBasicDescripcion">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" />
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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));




export default function Showroom(){
    const [modalShow, setModalShow] = React.useState(false);
    const classes = useStyles();

    const [products, updateProducts] = useState([])
    useEffect(() => {
      listProducts()
    }, [])

    async function listProducts() {
        const products = await API.graphql(graphqlOperation(ListProducts))
        updateProducts(products.data.listProducts.items)
      }

    return(
      <div>
        <GridList  cols={5} cellHeight={180} pacing={15} className={classes.gridList}>
        {
          products.map((p, i) => (
          <img key={i} src={p.image} onClick={() => setModalShow(true)}  /> ))
        }
        </GridList>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
      </div>
       
    )
  }



