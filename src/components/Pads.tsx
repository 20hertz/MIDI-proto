import { h, Fragment } from 'preact';
import { BaseKeys } from '../constants';

interface PadsProps {
  keys: string[];
}

const Pads = ({ keys }: PadsProps) => (
  <>
    {keys.map((key) => (
      <Pad id={key} />
    ))}
  </>
);

interface Props {
  // id: BaseKeys;
  id: string;
}

const Pad = ({ id }: Props) => <div id={id} className="pad" />;

export default Pads;
