import { listProducts as ListProducts } from "../src/graphql/queries";
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';


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
       <GridList  cols={5} cellHeight={180} pacing={15} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {
          products.map((p, i) => (
          <img key={i} src={p.image}  /> ))
        }
        </GridList>
    )
  }



