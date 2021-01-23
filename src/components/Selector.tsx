import React from 'react';

interface Props {
  haveError: boolean;
  isLoading: boolean;
  samplesMap: any;
}

const Selector = ({ haveError, isLoading, samplesMap }: Props) => {
  const listSamples = samplesMap.map(sample => {
    const [spn, name] = sample;
    return <div key={spn}>{`${spn} - ${name}`}</div>;
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
