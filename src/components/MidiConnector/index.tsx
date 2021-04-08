import React from 'react';
import { useMidi } from '../../hooks/useMidi';
import './style.sass';
import IconMidi from '../../icon-midi.svg';

const MidiConnector = () => {
  const { handleSelectChange, midiInputId, midiInputs } = useMidi();

  const inputOptions = () => {
    for (const input of midiInputs) {
      return <option value={input.id}>{input.name}</option>;
    }
  };

  return (
    <select
      className="dropdown button midi-connector"
      onChange={handleSelectChange}
      value={midiInputId}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath d='M0 0H16V16H0z' transform='translate(-755 -224) translate(420 204) translate(305) translate(30 20)'/%3E%3Cpath fill='%23F7D445' fill-rule='nonzero' d='M8 0c2.122 0 4.157.843 5.657 2.343S16 5.878 16 8c0 4.418-3.582 8-8 8-2.122 0-4.157-.843-5.657-2.343S0 10.122 0 8s.843-4.157 2.343-5.657S5.878 0 8 0m6.544 8c0-3.056-2.104-5.632-4.944-6.344V3.2H6.4V1.656C3.56 2.368 1.456 4.944 1.456 8c0 3.614 2.93 6.544 6.544 6.544 3.614 0 6.544-2.93 6.544-6.544M4 6.912c.6 0 1.088.487 1.088 1.088 0 .6-.487 1.088-1.088 1.088-.6 0-1.088-.488-1.088-1.088 0-.6.488-1.088 1.088-1.088m8 0c.6 0 1.088.487 1.088 1.088 0 .6-.487 1.088-1.088 1.088-.6 0-1.088-.487-1.088-1.088 0-.6.487-1.088 1.088-1.088M5.088 9.816c.29 0 .57.115.775.321.206.206.321.484.321.775 0 .6-.488 1.088-1.096 1.088C4.488 12 4 11.513 4 10.912c0-.608.488-1.096 1.088-1.096m5.824 0c.6 0 1.088.488 1.088 1.096 0 .6-.487 1.088-1.088 1.088-.608 0-1.096-.488-1.096-1.088 0-.29.115-.57.321-.775.206-.206.484-.321.775-.321M8 10.912c.6 0 1.088.487 1.088 1.088 0 .6-.487 1.088-1.088 1.088-.6 0-1.088-.487-1.088-1.088 0-.6.487-1.088 1.088-1.088z' transform='translate(-755 -224) translate(420 204) translate(305) translate(30 20)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {midiInputs.length ? (
        inputOptions()
      ) : (
        <option value="noinput" disabled>
          No MIDI devices
        </option>
      )}
    </select>
  );
};

export default MidiConnector;
