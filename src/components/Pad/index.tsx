import React from 'react';
import { SPN } from '../../constants';
import './style.sass';

interface Props {
  id: SPN;
  loading: boolean;
}

const Pad = ({ id, loading }: Props) => (
  <div
    id={id}
    className="pad"
    style={loading ? { backgroundColor: 'grey' } : {}}
  />
);

export default Pad;
