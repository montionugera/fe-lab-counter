import React from 'react'
import App, { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ActionTypes } from '../actions/actionTypes'
import { withReduxStore } from '../hoc/withReduxStore'
import { AppState } from '../reducers'
import { routerUpdateAction } from '../actions/routerUpdate'
import Router from 'next/router'
import { Persistor } from 'redux-persist/es/types'
import { PersistGate } from 'redux-persist/integration/react'
import '../styles/antd.less'

interface AppStore extends Store<AppState, ActionTypes> {
    __PERSISTOR: Persistor | null
}

interface Props extends AppProps {
    store: AppStore
    persistor: Persistor | null
}

class MyApp extends App<Props> {
    constructor(props: Props) {
        super(props)

        const router = props.router // ServerRouter
        const { store } = props
        const { dispatch } = store

        // On first rendering, routeChangeComplete won't dispatch
        // So dispatch once here for Redux
        dispatch(routerUpdateAction(router.route))

        Router.events.on('routeChangeComplete', (url: string) => {
            dispatch(routerUpdateAction(url))
        })
    }

    public render() {
        const { Component, pageProps, store } = this.props
        return (
            <Provider store={store}>
                <PersistGate
                    loading={null}
                    persistor={store.__PERSISTOR as Persistor}
                >
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        )
    }
}

export default withReduxStore<Props>(MyApp)
