import React from 'react';

const Selector = ({ haveError, isLoading, samplesMap }) => {
  const listSamples = samplesMap.map(sample => {
    const [key, name] = sample;
    return <div key={key}>{`${key} - ${name}`}</div>;
  });

  return (
    <div className="selector">
      {isLoading ? (
        <div>Loading</div>
      ) : haveError ? (
        <h4>Sorry, we're unable to download this kit correctly.</h4>
      ) : (
        <>
          <h4>Samples</h4>
          <div>{listSamples}</div>
        </>
      )}
    </div>
  );
};

export default Selector;
