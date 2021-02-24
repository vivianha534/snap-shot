import React, {useState, useEffect} from 'react'
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import {makeStyles, createStyles} from "@material-ui/core/styles"
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from '../../actions/postsActions'

const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
      paper: {
        padding: theme.spacing(2),
        marginTop: "2.5vh",
      },
      form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      fileInput: {
        width: '97%',
        margin: '10px 0',
      },
      buttonSubmit: {
        marginBottom: 10,
      },
        // eslint-disable-next-line comma-dangle
    })
);


const Form = ({currentId, setCurrentId}) =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile:''})
    const user = JSON.parse(localStorage.getItem('profile'))
    //fetch data from redux
    //if currentId != null, find post that has same id as currentId
    const updatedPost = useSelector((state) => currentId ? state.Posts.find((p) => p._id === currentId) : null)

    //use useEffect to populate the form if we want to update a post
    //dependency array tells us when we should run callback function
    //in this case it's when updatedPost value changes from nothing to the actual post
    useEffect(() =>{
      if(updatedPost){
          setPostData(updatedPost);
      }
    }, [updatedPost])

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!currentId) {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
      } else {
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      }
      clear();
    };  

    const clear = () =>{
      setCurrentId(null)
      setPostData({ title: '', message: '', tags: '', selectedFile:''})
    }

    if(!user?.result?.name){
      return(
        <Paper className={classes.paper}>
          <Typography variant = "h6" align="center">
            Please Sign In to create your own memories, and like other's memories
          </Typography>
        </Paper>
      )
    }
    
    return(
      <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6"> {currentId ? 'Editing': 'Creating'} a Memory </Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    )
}

export default Form