import React, { useReducer } from 'react';

export interface IAppState {
  getAudioContext: () => AudioContext;
  currentTrack: number;
};

let audioCtx = null;
export const defaultState: IAppState = {
  getAudioContext: () => {
    if (audioCtx === null) {
      // @ts-ignore
      audioCtx = new (window.AudioContext || window.webkitAudioContext)({
        latencyHint: "playback",
        sampleRate: 44100,
      });
    }

    return audioCtx;
  },
  currentTrack: -1,
};

const StateContext = React.createContext(defaultState);
const DispatchContext = React.createContext({});

export const AppStateProvider = ( { children } ) => {

  const [ state, dispatch ] = useReducer((state: IAppState, action) => {
    switch (action.type) {
      case 'TRACK_UPDATE': {
        return {...state, currentTrack: action.payload.currentTrackIndex};
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }, defaultState);

  return <StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
      {children}
    </DispatchContext.Provider>
  </StateContext.Provider>
};

export const useState = () => {
  const context = React.useContext(StateContext);

  if (context === undefined) {
    throw new Error('useState must be used within a AppStateProvider');
  }

  return context;
};

export const useDispatch = () => {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a DispatchProvider');
  }

  const actions = {
    //@ts-ignore
    updateCurrentTrack: (currentTrackIndex: number) => context({
      type: 'TRACK_UPDATE',
      payload: {
        currentTrackIndex,
      }
    }),
  };

  return actions;
};

export default StateContext;
