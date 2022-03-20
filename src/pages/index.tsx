// import { useRouter } from 'next/router'

import React, { useState } from 'react'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Button, message } from 'antd'
import { getChildrenToRender } from '../components/Nav/utils'
import { Content110DataSource } from '../data/statics/data.source'
import SimpleLayout from '../layouts/simple-layout'

import { FacebookFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import config from '../data/statics/config'
import { loginByFacebookToken } from '../data/svc/user'
import { AppState } from '../reducers'
import { useDispatch, useSelector } from 'react-redux'
import {
    checkIsUserStateValid,
    UserAction,
    UserState,
} from '../reducers/userReducer'
import { useEffect } from 'react'
interface PageState {
    loading: boolean
    error: any
    displayName: string | null
}
const _initPageState: PageState = {
    loading: false,
    error: null,
    displayName: null,
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
const FacebookLoginPage = () => {
    const { query, push } = useRouter()
    const dispatch = useDispatch()
    const userState: UserState = useSelector((state: AppState) => state.user)
    const autoLogin = query.auto_login ? query.auto_login : null
    const code = query.code ? query.code : null
    const [pageState, setPageState] = useState<PageState>({ ..._initPageState })
    const requestAuthByFacebookTokenFn = async () => {
        await sleep(500)
        try {
            const result = await loginByFacebookToken(`${code}`)
            setPageState({
                ...pageState,
                ...{
                    error: null,
                    loading: false,
                    displayName: result.user ? result.user.displayName : null,
                },
            })
            dispatch({
                type: UserAction.AUTH_BY_FACEBOOK_TOKEN_SUCCESS,
                payload: result,
            })
        } catch (error) {
            setPageState({ ...pageState, ...{ error, loading: false } })
            message.error('😢 Can not login with facebook, Please try again')
        }
    }
    useEffect(() => {
        if (userState.user) {
            const isUserStateValid = checkIsUserStateValid(userState)
            if (!isUserStateValid) {
                dispatch({
                    type: UserAction.SIGN_OUT_USER,
                    payload: {},
                })
            } else {
                setPageState({
                    ...pageState,
                    ...{
                        error: null,
                        loading: false,
                        displayName: userState.user.displayName,
                    },
                })
            }
        } else {
            if (code) {
                setPageState({
                    ...pageState,
                    ...{ error: null, loading: true },
                })
                requestAuthByFacebookTokenFn()
            }
        }
    }, [])
    const dataSource = Content110DataSource
    const redirectToFBLogin = () => {
        if (window) {
            push(config.fbLoginURL)
        }
    }
    if (autoLogin) {
        redirectToFBLogin()
    }
    return (
        <SimpleLayout title="Home">
            <OverPack {...dataSource.OverPack}>
                <QueueAnim
                    type="bottom"
                    leaveReverse
                    key="page"
                    delay={[0, 100]}
                    {...dataSource.titleWrapper}
                >
                    {dataSource.titleWrapper.children.map(getChildrenToRender)}
                </QueueAnim>
                <TweenOne
                    key="button"
                    style={{ textAlign: 'center' }}
                    {...dataSource.button}
                    animation={{ y: 30, opacity: 0, type: 'from', delay: 300 }}
                >
                    {!pageState.loading && userState.user ? (
                        <h1>Welcome {userState.user.displayName}</h1>
                    ) : (
                        <Button
                            type="primary"
                            icon={<FacebookFilled />}
                            size="large"
                            disabled={pageState.loading}
                            loading={pageState.loading}
                            onClick={() => {
                                redirectToFBLogin()
                            }}
                        >
                            Login With Facebook Yo
                        </Button>
                    )}
                </TweenOne>
            </OverPack>
        </SimpleLayout>
    )
}

export default FacebookLoginPage
