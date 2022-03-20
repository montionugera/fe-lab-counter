// import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'antd'
import SimpleLayout from '../layouts/simple-layout'

import { useRouter } from 'next/router'
import { AppState } from '../reducers'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../reducers/userReducer'
import useInterval from 'use-interval'
import Sound from 'react-sound'
import useSound from 'use-sound'
import { io, Socket } from 'socket.io-client'

interface PageState {
    loading: boolean
    error: any
    displayName: string | null
    startTime: number | null
    labCount: number
    shouldStart: boolean
}

const _initPageState: () => PageState = () => {
    return {
        loading: false,
        shouldStart: false,
        error: null,
        displayName: 'Gwinn 🏎',
        startTime: null,
        labCount: 0,
    }
}

const CountDownLabel = ({ startTime }: { startTime: number | null }) => {
    let startTimeDisplay = 'Not Started 🚫'
    if (startTime) {
        const [nowInSeconds, setNowInSeconds] = React.useState(
            Date.now() / 1000,
        )

        useInterval(() => {
            setNowInSeconds(Date.now() / 1000)
        }, 80)
        const [sec, ms] = `${nowInSeconds - startTime}`.split('.')
        startTimeDisplay = `${sec} : ${ms.substr(0, 3)} `
    }

    return <h3>{startTimeDisplay}</h3>
}
const FacebookLoginPage = () => {
    const { query, push } = useRouter()
    // const [play, { stop }] = useSound('/static/sound/countdown.wav')
    const dispatch = useDispatch()
    const userState: UserState = useSelector((state: AppState) => state.user)
    const autoLogin = query.auto_login ? query.auto_login : null
    const code = query.code ? query.code : null
    const [pageState, setPageState] = useState<PageState>({
        ..._initPageState(),
    })
    const [playTickSound] = useSound('/static/sound/sound-tick.wav')

    useEffect(() => {
        console.log('use effect')
        // play()
        setPageState({ ...pageState })
    }, [])

    const [socket, setSocket] = useState<Socket | null>(null)
    useEffect(() => {
        console.log('init socket', `:3000`)
        const newSocket = io(`:3000`)
        setSocket(newSocket)

        const messageListener = (message) => {
            console.log(message)
        }

        const deleteMessageListener = (messageID) => {
            console.log(messageID)
        }
        newSocket.on('message', messageListener)
        newSocket.on('deleteMessage', deleteMessageListener)
        newSocket.emit('getMessages')

        return () => {
            newSocket.close()
        }
    }, [setSocket])
    return (
        <SimpleLayout title="Home">
            <Row justify="center" style={{ textAlign: 'center' }}>
                <Button
                    onClick={() => {
                        console.log('Play')
                        setPageState({
                            ...pageState,
                            shouldStart: true,
                            labCount: 0,
                            startTime: null,
                        })
                    }}
                >
                    Start Lab
                </Button>
                <Button
                    onClick={() => {
                        playTickSound()
                        setPageState({
                            ...pageState,
                            labCount: ++pageState.labCount,
                        })
                    }}
                >
                    Add Lab
                </Button>
            </Row>
            <Row justify="center" style={{ textAlign: 'center' }}>
                <Col span={4}>
                    <h1> {pageState.displayName} </h1>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={4}>
                            <h3> Lab : </h3>
                        </Col>
                        <Col span={8}>
                            <h3 style={{ fontSize: '5em' }}>
                                {pageState.labCount}
                            </h3>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Col span={4}>
                            <h3> Total Time : </h3>
                        </Col>
                        <Col span={8}>
                            <CountDownLabel startTime={pageState.startTime} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Sound
                url="/static/sound/countdown.wav"
                playStatus={
                    pageState.shouldStart
                        ? Sound.status.PLAYING
                        : Sound.status.STOPPED
                }
                // playFromPosition={10 /* in milliseconds */}

                onLoading={() => {
                    console.log('load')
                }}
                onPlaying={(e) => {
                    if (e.position > 4500) {
                        console.log(e)
                        if (!pageState.startTime) {
                            setPageState({
                                ...pageState,
                                startTime: Date.now() / 1000,
                            })
                        }
                    }
                }}
                onFinishedPlaying={() => {
                    console.log('Finish')
                    setPageState({
                        ...pageState,
                        shouldStart: false,
                    })
                }}
            />
        </SimpleLayout>
    )
}

export default FacebookLoginPage
