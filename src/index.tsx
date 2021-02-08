// Must be the first import
// if (devOnly) {
// Must use require here as import statements are only allowed to exist at top-level.
// require('preact/debug');
// }
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const mountNode = document.getElementById('root');

render(<App />, mountNode);
