import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Main from './pages/Main';
import Editor from './pages/Editor';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';


export const Routes = (isAuthenticated) => {
  console.log('Route ' + isAuthenticated)

  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" >
          <Main />
        </Route>
        <Route exact path="/editor" >
          <Editor />
        </Route>

        <Route exact path="/login" >
        <Login />
      </Route>

        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/" >
        <Main />
      </Route>
      <Route exact path="/login" >
        <Login />
      </Route>
      <Route exact path="/registration" >
        <Registration />
      </Route>

      {/*
      <Route exact path="/editor" >
        <Editor />
      </Route>
      */}

      <Redirect to="/login" />
    </Switch>
  )
}