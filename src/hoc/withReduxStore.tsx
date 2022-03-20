import NextApp, { AppContext, AppProps } from 'next/app'
import React from 'react'
import { PreloadedState, Store } from 'redux'
import { AppState, createRootReducer } from '../reducers'
import { getStore } from '../store/configureStore'
import { ActionTypes } from '../actions/actionTypes'
import {} from 'redux-persist'
import { Persistor } from 'redux-persist/es/types'

const isServer = typeof window === 'undefined'
export const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

const rootReducer = createRootReducer()
export interface AppStore extends Store<AppState, ActionTypes> {
    __PERSISTOR?: Persistor | null
}
function getOrCreateStore(initialState?: PreloadedState<AppState>): AppStore {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return getStore<AppState, ActionTypes>(rootReducer, initialState)
    }

    // Create store if unavailable on the client and set it on the window object
    if (!Object.prototype.hasOwnProperty.call(window, __NEXT_REDUX_STORE__)) {
        const store = getStore<AppState, ActionTypes>(rootReducer, initialState)
        window[__NEXT_REDUX_STORE__] = store
    }
    return window[__NEXT_REDUX_STORE__]
}

export function withReduxStore<NextAppProps>(App: typeof NextApp) {
    type Props = NextAppProps &
        AppProps & { initialReduxState: PreloadedState<AppState> }
    return class AppWithRedux extends React.Component<Props> {
        public static async getInitialProps(appContext: AppContext) {
            const store = getOrCreateStore()

            appContext.ctx.store = store

            let appProps = {}
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext)
            }

            return {
                ...appProps,
                initialReduxState: store.getState(),
            }
        }
        protected store: AppStore

        constructor(props: Props) {
            super(props)
            this.store = getOrCreateStore(props.initialReduxState)
        }

        public render() {
            return <App {...this.props} store={this.store} />
        }
    }
}
