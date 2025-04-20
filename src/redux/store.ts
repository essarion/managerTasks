import { configureStore } from '@reduxjs/toolkit';
import userSlice from './actions/createUserTS'

const store = configureStore({
    reducer: {
        createUser: userSlice.reducer

    }
})


export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;