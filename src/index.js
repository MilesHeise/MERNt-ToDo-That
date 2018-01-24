import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
  document.getElementById('root'));
  registerServiceWorker();

// walkthrough had url and poll interval as props on App tag like
// url='http://localhost:3001/api/todos' pollInterval={2000}
// but that didn't work. then they inherited so the get request
// was like this.props.url in the axios request instead of
// the actual url. I feel like that is probably better practice
// so I should possibly keep trying to change this to match?
// it should be on the tag directly rendering my List
// but this tag just renders everything, and on App.js
// there is just a route tag, not a render tag for the List
// so where would it go, properly?
