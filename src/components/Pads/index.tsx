import React from 'react';
import { SPN } from '../../constants';
import { setAvailableKeys, usePads } from '../../hooks/usePads';
import { useSampler } from '../../hooks/useSampler';
import { useSelectorContext } from '../../services/selector';
import './style.scss';

// interface PadGridProps {
//   areLoading: boolean;
// }

const PadGrid = () => {
  const { areLoading, samplesTable } = useSampler();
  // const { keys } = usePads();
  const numberOfSamples = samplesTable?.length || 0;
  const numberOfKeys = numberOfSamples > 16 ? numberOfSamples : 16;

  // const [keys, setKeys] = useState([]);
  const {
    state: { currentOctave },
  } = useSelectorContext();

  // const setActiveKeys = () => {
  //   const activeKeys = setAvailableKeys(numberOfKeys, currentOctave);
  //   setKeys(activeKeys);
  // };

  // useEffect(() => {
  //   setActiveKeys();
  // }, [currentOctave]);

  const keys = setAvailableKeys(numberOfKeys, currentOctave);

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
