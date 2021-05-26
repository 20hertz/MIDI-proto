import React from 'react';
import { usePadGrid } from '../../hooks/usePads';
import Pad from '../Pad';
import './style.sass';

const PadGrid = () => {
  const { areLoading, initialColumns, keys } = usePadGrid();

  return (
    <div className={`pad-grid pad-grid-${initialColumns}`} id="controller">
      {keys.map(key => (
        <Pad id={key} key={key} loading={areLoading} />
      ))}
    </div>
  );
};

export default PadGrid;
