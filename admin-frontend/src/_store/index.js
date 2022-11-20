import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { postsReducer } from './posts.slice';

export * from './auth.slice';
export * from './posts.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    },
});