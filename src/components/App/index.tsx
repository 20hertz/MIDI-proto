import React from 'react';
import Providers from '../Providers';
import Sampler from '../Sampler';
// import './style.sass';

const App = () => (
  <Providers>
    <>
      <div className="container">
        <Sampler />
      </div>
    </>
  </Providers>
);

export default App;
