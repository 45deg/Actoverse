import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './js/store';
import Root from './js/components/Root';

import { mountGlobalObject } from './js/global';

import 'css/base';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

mountGlobalObject();
