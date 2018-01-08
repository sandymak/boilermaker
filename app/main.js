'use strict';
import Provider from 'react-redux';
import store from './store';
import React from 'react';
import reactDOM from 'react-dom'
// import { render } from 'react-dom'

reactDOM.render(
  <Provider store={store}>
  <div>Woohoo! reactDOM render works! (time for a hiatus...)</div>
  </Provider>
  , document.getElementById('app')
)
