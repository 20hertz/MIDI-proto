import { h } from 'preact';
import { Keys } from '../constants';

interface Props {
  id: Keys;
}

const Pad = ({ id }: Props) => <div id={id} className="pad"></div>;

export default Pad;
