import React, { useEffect, useState } from 'react';
import { SPN } from '../../constants';
import { setAvailableKeys } from '../../hooks/usePads';
import { useSampler } from '../../hooks/useSampler';
import './style.sass';

const PadGrid = () => {
  const { areLoading, samplesTable } = useSampler();

  const [initialColumns, setInitialColumns] = useState(4);

  const [numberOfKeys, setNumberOfKeys] = useState(16);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const numberOfSamples = samplesTable?.length || 0;
    const header = document.getElementsByTagName('header')[0];
    const buttons = document.getElementById('buttons');

    const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;

    const topHeight =
      header.getBoundingClientRect().height +
      buttons.getBoundingClientRect().height;

    const remainingHeight = viewportHeight - topHeight;

    const numberOfColumnThatFitsWidth = Math.floor((viewportWidth - 10) / 150);

    const numberOfInitialColumns =
      numberOfColumnThatFitsWidth < 4 ? numberOfColumnThatFitsWidth : 4;

    const numberOfRowThatFitsHeight = Math.floor((remainingHeight - 10) / 150);

    const numberOfInitialRows =
      numberOfRowThatFitsHeight < 4 ? numberOfRowThatFitsHeight : 4;

    const numberOfMinKeys = numberOfInitialRows * numberOfInitialColumns;

    const numberOfKeys =
      numberOfSamples > numberOfMinKeys ? numberOfSamples : numberOfMinKeys;

    setNumberOfKeys(numberOfKeys);
    setInitialColumns(numberOfInitialColumns);
  }, [window, samplesTable]);

  useEffect(() => {
    const keys = setAvailableKeys(numberOfKeys, 4);
    setKeys(keys);
  }, [numberOfKeys, initialColumns]);

  return (
    <div className={`pad-grid pad-grid-${initialColumns}`} id="controller">
      {keys.map(key => (
        <Pad id={key} key={key} loading={areLoading} />
      ))}
    </div>
  );
};

interface PadProps {
  id: SPN;
  loading: boolean;
}

const Pad = ({ id, loading }: PadProps) => (
  <div
    id={id}
    className="pad"
    style={loading ? { backgroundColor: 'grey' } : {}}
  />
);

export default PadGrid;
