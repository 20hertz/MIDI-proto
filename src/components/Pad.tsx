import { h } from 'preact';
import { BaseKeys } from '../constants';

interface Props {
  // id: BaseKeys;
  id: string;
}

const Pad = ({ id }: Props) => <div id={id} className="pad"></div>;

export default Pad;
