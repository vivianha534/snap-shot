import React, {useState, useEffect} from 'react'
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import {Container, Grow, Grid} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import{getPosts} from '../../actions/postsActions'
import {makeStyles,createStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) =>
    createStyles({
      appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      },
        // eslint-disable-next-line comma-dangle
    })
);

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null);
  
    useEffect(() =>{
      dispatch(getPosts());
    },[currentId, dispatch])

    return (
        <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} justify="space-between" alignItems = "stretch" spacing="3">
                    <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
