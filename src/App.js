import React from 'react';
import {makeStyles,createStyles} from "@material-ui/core/styles"
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';


const useStyles = makeStyles((theme) =>
    createStyles({
      [theme.breakpoints.down('sm')]:{
        mainContainer:{
          flexdirection: "column-reverse",
        }
      }
        // eslint-disable-next-line comma-dangle
    })
);

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
