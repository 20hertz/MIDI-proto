import { h } from 'preact';
import Pads from './Pads';
import { useSamplesContext } from './SamplesProvider';

const Controller = () => {
  const { fetchHasError } = useSamplesContext();

  return (
    <div className="playground">
      <div></div>
      <div id="controller" className="grid">
        <Pads />
      </div>
      <div className="selector">
        {fetchHasError ? (
          <h4>Sorry, we're unable to download this kit correctly.</h4>
        ) : (
          <h4>Samples</h4>
        )}
      </div>
    </div>
  );
};

export default Controller;
