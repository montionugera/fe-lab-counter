import {
    Action,
    AnyAction,
    applyMiddleware,
    createStore,
    PreloadedState,
    Reducer,
    Store,
} from 'redux'
import middleware from '../middlewares'

export function getStore<S = any, A extends Action = AnyAction>(
    reducer: Reducer,
    initialState?: PreloadedState<S>,
): Store<S, A> {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const storage = require('redux-persist/lib/storage').default
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { persistReducer, persistStore } = require('redux-persist')

        const persistConfig = {
            key: 'root',
            storage,
            blacklist: ['authType'],
        }
        const autoPersistReducer = persistReducer(persistConfig, reducer)
        initialState = undefined

        const store = createStore<S, A, unknown, unknown>(
            autoPersistReducer,
            initialState,
            applyMiddleware(...middleware),
        )

        const customStore = store as any
        customStore.__PERSISTOR = persistStore(store)
        return store
    } else {
        const store = createStore<S, A, unknown, unknown>(
            reducer,
            initialState,
            applyMiddleware(...middleware),
        )
        return store
    }
}
