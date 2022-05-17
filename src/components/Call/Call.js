import { useEffect, useReducer } from 'react';

import { 
    callReducer,
    initialCallState,
    PARTICIPANTS_CHANGE,
    isLocal,
    isScreenShare,
} from './callState';
import Tile from '../Tile/Tile';

function Call({ callObject }) {
    const [callState, dispatch] = useReducer(callReducer, initialCallState);

    useEffect(() => {
        const events = [
            'participant-joined',
            'participant-updated',
            'participant-left',
        ];

        function handleNewParticipantsState(event) {
            dispatch({
                type: PARTICIPANTS_CHANGE,
                participants: callObject.participants(),
            })
        }

        handleNewParticipantsState();

        for (const event of events) {
            callObject.on(event, handleNewParticipantsState);
        }

        return function cleanup() {
            for (const event of events) {
                callObject.off(event, handleNewParticipantsState);
            }
        }

    }, [callObject]);

    function getTiles() {
        let largeTiles = [];
        let smallTiles = [];
        Object.entries(callState.callItems).forEach(([id, callItem]) => {
          const isLarge = (!isLocal(id));
          const tile = (
            <Tile
              key={id}
              videoTrackState={callItem.videoTrackState}
              audioTrackState={callItem.audioTrackState}
              isLocalPerson={isLocal(id)}
              isLarge={isLarge}
              disableCornerMessage={isScreenShare(id)}
            />
          );
          if (isLarge) {
            largeTiles.push(tile);
          } else {
            smallTiles.push(tile);
          }
        });
        return [largeTiles, smallTiles];
      }

    const [largeTiles, smallTiles] = getTiles();

    return (
        <div className="call">
            <div className="large-tiles">{largeTiles}</div>
            <div className="small-tiles">{smallTiles}</div>
        </div>
    );
}

export { Call };
