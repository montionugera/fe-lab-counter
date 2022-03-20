import { ActionTypes } from '../actions/actionTypes'
import jwt_decode from 'jwt-decode'

export interface UserData {
    id: number
    displayName: string
    email: string
}
export interface UserState {
    accessToken: string | null
    user: UserData | null
}

export enum UserAction {
    AUTH_BY_FACEBOOK_TOKEN_SUCCESS = 'user/AUTH_BY_FACEBOOK_TOKEN_SUCCESS',
    SIGN_OUT_USER = 'user/SIGN_OUT_USER',
    REHYDRATE = 'persist/REHYDRATE',
}
const _initialStateUser = {
    accessToken: null,
    user: null,
}

export const userReducer = (
    state = _initialStateUser,
    action: ActionTypes,
): UserState => {
    switch (action.type) {
        case UserAction.AUTH_BY_FACEBOOK_TOKEN_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case UserAction.REHYDRATE:
            if (action.payload?.user) {
                return {
                    ...state,
                    ..._initialStateUser,
                    ...action.payload?.user,
                }
            } else {
                return {
                    ..._initialStateUser,
                }
            }
        case UserAction.SIGN_OUT_USER:
            return {
                ..._initialStateUser,
            }

        default:
            return {
                ...state,
            }
    }
}

export const checkIsUserStateValid: (userState: UserState) => boolean = (
    userState: UserState,
) => {
    if (userState?.accessToken) {
        try {
            const jwtDecodeResult = jwt_decode<any>(userState.accessToken) // If no error, token info is returned
            console.log('jwtDecodeResult', jwtDecodeResult)
            if (jwtDecodeResult) {
                const nowEpoc = Math.round(Date.now() / 1000)
                const expireDiff = jwtDecodeResult.exp - nowEpoc
                console.log('expireDiff', expireDiff)
                return expireDiff > 3500
            }
        } catch (err) {
            // Manage different errors here (Expired, untrusted...)
        }
    }
    return false
}
