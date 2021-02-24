import React from 'react'
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {Card, CardActions, CardContent, CardMedia, Button, IconButton, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import{deletePost, likePost} from "../../../actions/postsActions"

const useStyles = makeStyles((theme) =>
    createStyles({
      media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
      },
      border: {
        border: 'solid',
      },
      fullHeightCard: {
        height: '100%',
      },
      card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
      },
      overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
      },
      overlay2: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
      },
      grid: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      },
      title: {
        padding: '0 16px',
      },
      cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      },
        // eslint-disable-next-line comma-dangle
    })
);

const Post = ({post, setCurrentId}) =>{
    const classes = useStyles()
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} title={post.title} image={post.selectedFile} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button className={classes.overlay2} style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
            Edit<MoreHorizIcon fontSize="default" />
          </Button>
        )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
            <Likes/>
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" /> Delete
              {console.log("delete")}
            </Button>
          )}
        </CardActions>
      </Card>
    );
}

export default Post