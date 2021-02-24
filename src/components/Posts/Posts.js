import React from 'react'
import Post from './Post/Post'
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {useSelector} from 'react-redux'
import {Grid, CircularProgress} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({
      mainContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: "1vh",
      },
        // eslint-disable-next-line comma-dangle
    })
);

const Posts = ({setCurrentId}) =>{
    const classes = useStyles()
    const posts = useSelector((state) => state.Posts)

    return(
      !posts.length ? <CircularProgress /> : (
        <Grid className={classes.mainContainer} container alignItems = "stretch" spacing={3}>
          {posts.map((post)=>(
            <Grid key={post.id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
        </Grid>
      )
    )
}

export default Posts