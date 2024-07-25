import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {storage} from '@services/mmkv';
import {GameInfo} from 'src/constants/GameInfo';

export interface State {
  games: number;
  wins: number;
  leastAttempts: number;
}

const INITIAL_STATE: State = {
  games: storage.getNumber('games') ?? 0,
  wins: storage.getNumber('wins') ?? 0,
  leastAttempts: storage.getNumber('leastAttempts') ?? 0,
};

const slice = createSlice({
  name: 'appCommon',
  initialState: INITIAL_STATE,
  reducers: {
    proceedGame(state, action: PayloadAction<GameInfo>) {
      state.games++;
      if (action.payload.isWin) {
        state.wins++;
        if (
          !state.leastAttempts ||
          state.leastAttempts > action.payload.attempts
        ) {
          state.leastAttempts = action.payload.attempts;
        }
      }
    },
    restore(state, action: PayloadAction<State>) {
      Object.assign(state, action.payload);
    },
  },
});

export const gameStateReducer = slice.reducer;
export const {proceedGame, restore} = slice.actions;
