import './App.css';
import { useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

import { Call } from './components/Call/Call';
import Tray from './components/Tray/Tray';
import CallObjectContext from './CallObjectContext';

const ROOM_URL = 'https://webamigos.daily.co/4MkShXrWxlryCWJ0ZNo1';

const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';

function App() {
  const [appState, setAppState] = useState();
  const [roomUrl] = useState(ROOM_URL);
  const [callObject, setCallObject] = useState(null);

  const showCall = [STATE_JOINING, STATE_JOINED].includes(appState);

  const startJoiningCall = () => {
    const newCallObject = DailyIframe.createCallObject();
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    newCallObject.join({ url: ROOM_URL });
  };

  return (
    <div className="app">
      {showCall
        ? (<>
            <Call roomUrl={roomUrl} callObject={callObject} />
            <CallObjectContext.Provider value={callObject}>
              <Tray
                disabled={false}
              />
            </CallObjectContext.Provider>
          </> )
        : <button onClick={() => {
          startJoiningCall();
        }}>
          Start a call
        </button>}
    </div>
  );
}

export default App;
