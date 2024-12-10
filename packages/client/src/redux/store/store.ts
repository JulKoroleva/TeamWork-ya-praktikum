import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from '../reducers';

export const store = configureStore<{ authentication: typeof authenticationReducer }>({
  reducer: {
    //@ts-expect-error
    authentication: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;
