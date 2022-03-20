import { ActionTypes } from '../actions/actionTypes'

const _initialStateCounter = { totalCount: 0 }
export interface CounterState {
    totalCount: number
}

export enum CounterAction {
    ADD = 'COUNTER.ADD',
    REHYDRATE = 'persist/REHYDRATE',
}

export const counterReducer = (
    state = _initialStateCounter,
    action: ActionTypes,
): CounterState => {
    switch (action.type) {
        case CounterAction.ADD:
            return {
                ...state,
                totalCount: state.totalCount + action.payload,
            }
        case CounterAction.REHYDRATE:
            if (action.payload?.counter?.totalCount) {
                return {
                    ...state,
                    totalCount: action.payload.counter.totalCount,
                }
            } else {
                return {
                    ...state,
                }
            }
        default:
            return {
                ...state,
            }
    }
}
