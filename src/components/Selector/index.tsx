import React from 'react';
import './style.sass';

interface Props {
  haveError: boolean;
  isLoading: boolean;
  samplesTable: any;
}

const Selector = ({ haveError, isLoading, samplesTable }: Props) => {
  const listSamples = samplesTable.map(sample => {
    const [spn, { fileName }] = sample;
    return (
      <div className="selector-sample" key={spn}>{`${spn} - ${fileName}`}</div>
    );
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
