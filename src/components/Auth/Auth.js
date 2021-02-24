import React, {useState} from 'react'
import {TextField, Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import {makeStyles,createStyles} from "@material-ui/core/styles"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'
import {useDispatch} from 'react-redux'
import{useHistory} from'react-router-dom'
import {signIn, signUp} from "../../actions/auth"

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(2),
          },
          root: {
            '& .MuiTextField-root': {
              margin: theme.spacing(1),
            },
          },
          avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          },
          form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          },
          submit: {
            margin: theme.spacing(3, 0, 2),
          },
          googleButton: {
            marginBottom: theme.spacing(2),
          },
        // eslint-disable-next-line comma-dangle
    })
);

const initialFormState = {
    firstName: '', 
    lastName:'', 
    email: '', 
    password:'', 
    confirmPassword:''
};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialFormState)

    //whever you're changing the state based on the old state need a callback function
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) =>{
        //prevents browser refresh
        e.preventDefault( )
        
        if(isSignup){
            //we pass history so we can navigate once something happens
            dispatch(signUp(formData, history))
        }else{
            dispatch(signIn(formData,history))
        }

    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value })

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) =>{
        // optional chaining operator ?. won't throw an error if we don't have access to res object
        const result = res?.profileObj
        const token = res?.tokenId

        //since we're doing async
        //since we added the dispatch here, we need to add a reducer
        try{
            dispatch({type: 'AUTH', data:{result,token}});
            //return back to home page after dispatch
            history.push('/')
        }catch(error){
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try Again Later")
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                         <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                        clientId="169043271579-015eh75ftd5o43mp6k41llbc6ukik5ns.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained"
                        >
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Dont have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
