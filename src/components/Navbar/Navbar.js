import React, {useState,useEffect} from 'react'
import Logo from '../../assets/Logo.svg'
import {makeStyles,createStyles} from "@material-ui/core/styles"
import { deepPurple } from '@material-ui/core/colors';
import {AppBar, Typography, Avatar, Toolbar, Button} from '@material-ui/core' 
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'


const useStyles = makeStyles((theme) =>
    createStyles({
        appBar: {
            borderRadius: 15,
            margin: '30px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 50px',
          },
          heading: {
            color: 'rgba(0,183,255, 1)',
            textDecoration: 'none',
          },
          image: {
            marginLeft: '15px',
          },
          toolbar: {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '400px',
          },
          profile: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '400px',
          },
          userName: {
            display: 'flex',
            alignItems: 'center',
          },
          brandContainer: {
            display: 'flex',
            alignItems: 'center',
          },
          purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
          },
        // eslint-disable-next-line comma-dangle
    })
);

const Navbar = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    //retrieve user from local storage
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () =>{
        dispatch({type: 'LOGOUT'})
        //bring user back to homepage after logout
        history.push('/')
        setUser(null)
    }

    //when location changes set the user, we do this because after logging in we get redirected from /auth to just /
    useEffect(()=>{
        //checking if token exists
        const token = user?.token

        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        
        //set user to the user in local storage
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    return(
        <div>
            <AppBar className = {classes.appBar} position="static" color="inherit">
                <div className = {classes.brandContainer}>
                    <Typography component={Link} to="/" className = {classes.heading} variant = "h2" align="center">Snap Shot</Typography>
                    <img className = {classes.image} src={Logo} alt = "memories" height = "60" />
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ?(
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt = {user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6"> 
                                {user.result.name} 
                            </Typography>
                            <Button variant = "contained" className={classes.logout} color = "secondary" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ):(
                        <Button component = {Link} to = "/auth" variant = "contained" color = "primary">
                            Sign In
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar