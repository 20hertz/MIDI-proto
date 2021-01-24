import React from 'react';
import { SPN } from '../../constants';
import './style.sass';

interface PadsProps {
  areLoading: boolean;
  keys: SPN[];
}

const Pads = ({ areLoading, keys }: PadsProps) => (
  <div className="pads">
    {keys.map(key => (
      <Pad id={key} key={key} loading={areLoading} />
    ))}
  </div>
);

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

export default Pads;
