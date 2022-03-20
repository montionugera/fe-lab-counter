import axios from 'axios'
import { UserData } from '../../reducers/userReducer'
import config from '../statics/config'
export interface UserAuthResponse {
    accessToken: string | null
    user: UserData | null
}
export const loginByFacebookToken: (
    string,
) => Promise<UserAuthResponse> = async (fbToken: string) => {
    const resp = await axios.get(
        `${config.userServiceURL}/auth/login-by-facebook-token?code=${fbToken}`,
    )
    console.log(resp.data)
    return resp.data
}
