import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TInitialState {
  isHaveTopHeadBackground: boolean;
  isTopHeadBackgroundFixed: boolean;
  topHeadClassName: string;
}

const initialState = {
  isHaveTopHeadBackground: false,
  isTopHeadBackgroundFixed: false,
  topHeadClassName: '',
} as TInitialState;

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setIsHaveTopHeadBackground: (state, action: PayloadAction<boolean>) => {
      state.isHaveTopHeadBackground = action.payload;
    },

    setIsTopHeadBackgroundFixed: (state, action: PayloadAction<boolean>) => {
      state.isTopHeadBackgroundFixed = action.payload;
    },

    setTopHeadClassName: (state, action: PayloadAction<string>) => {
      state.topHeadClassName = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const layoutReducer = layoutSlice.reducer;

export const { setIsHaveTopHeadBackground, setIsTopHeadBackgroundFixed, setTopHeadClassName } =
  layoutSlice.actions;
