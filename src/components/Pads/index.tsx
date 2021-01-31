import React from 'react';
import { SPN } from '../../constants';
import { usePads } from '../../hooks/usePads';
import './style.sass';

interface PadGridProps {
  areLoading: boolean;
}

const PadGrid = ({ areLoading }: PadGridProps) => {
  const { keys } = usePads();
  return (
    <div className="pad-grid">
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
