import { combineReducers, Reducer } from 'redux'
import concerts from './concerts'
import { router } from './router'
import { counterReducer } from './counterReducer'
import { userReducer } from './userReducer'

export type AppState = {
    router: ReturnType<typeof router>
    concerts: ReturnType<typeof concerts>
    counter: ReturnType<typeof counterReducer>
    user: any
}
//
//
export const createRootReducer = (): Reducer => {
    const originalReducer = combineReducers<AppState>({
        concerts,
        router,
        counter: counterReducer,
        user: userReducer,
    })
    return originalReducer
}
