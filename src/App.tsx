import { h, Fragment, JSX } from 'preact';
import { useState } from 'preact/hooks';
import Controller from './components/Controller';
import { audioContext } from './index';

const App = () => {
  const [kit, setKit] = useState([]);

  const onChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      try {
        const decodedData = await audioContext.decodeAudioData(
          event.target.result
        );
        setKit([decodedData]);
      } catch (event) {
        console.log(
          'Sorry this browser unable to download this file... try Chrome',
          event
        );
      }
    };
    reader.onerror = (event) => {
      console.error('An error ocurred reading the file: ', event);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <h1 className="header">Tap dat</h1>
      <form>
        <label>
          Upload
          <input
            type="file"
            name="url"
            onChange={onChange}
            accept="audio/mpeg, audio/wave, audio/wav, audio/x-wav, audio/x-pn-wav, audio/flac"
            multiple
          />
        </label>
      </form>
      <Controller kit={kit} />
      <button>Allow sounds</button>
      <h4>Made with ♥️ by Lø</h4>
    </>
  );
};

export default App;
