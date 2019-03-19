import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fetchPosts } from '../actions';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const Root = ({ store }) => {
  useEffect(() => {
    store.dispatch(fetchPosts());
  });

  return (
    <Provider store={store}>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route exact path="/" component={App} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </Router>
    </Provider>
  );
};

const GlobalStyles = createGlobalStyle`
  html { font-size: 62.5% }
  body {
    font-size: 1.6rem
    font-family: sans-serif;
    line-height: 1.5;
    background-color: darkslategrey;
    color: white;
  }
`;

export default Root;
