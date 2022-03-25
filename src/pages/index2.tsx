// import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'antd'
import SimpleLayout from '../layouts/simple-layout'
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
    totalLab: number
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
        totalLab: 5,
    }
}

const CountDownLabel = ({
    startTime,
    labCount,
    totalLab,
}: {
    startTime: number | null
    labCount: number
    totalLab: number
}) => {
    let startTimeDisplay = 'Not Started 🚫'
    console.log('labCount / totalLab', startTime, '-', labCount, '-', totalLab)
    if (startTime) {
        const [nowInSeconds, setNowInSeconds] = React.useState(
            Date.now() / 1000,
        )
        useInterval(() => {
            if (labCount === totalLab + 1) {
                return
            }
            setNowInSeconds(Date.now() / 1000)
        }, 80)
        const [sec, ms] = `${nowInSeconds - startTime}`.split('.')
        const fixedMs = !ms ? '0' : ms
        startTimeDisplay = `${Math.floor(parseInt(sec) / 60)} : ${
            parseInt(sec) % 60
        } : ${fixedMs.length > 3 ? fixedMs.substr(0, 3) : fixedMs} `
    }

    return <h3>{startTimeDisplay}</h3>
}
const FacebookLoginPage = () => {
    // const { query, push } = useRouter()
    // const [play, { stop }] = useSound('/static/sound/countdown.wav')
    // const dispatch = useDispatch()
    // const userState: UserState = useSelector((state: AppState) => state.user)
    // const autoLogin = query.auto_login ? query.auto_login : null
    // const code = query.code ? query.code : null
    const [pageState, setPageState] = useState<PageState>({
        ..._initPageState(),
    })
    const [playTickSound] = useSound('/static/sound/sound-tick.wav')
    const [playWinSound] = useSound('/static/sound/win.wav')

    useEffect(() => {
        console.log('use effect')
        // play()
        setPageState({ ...pageState })
    }, [])

    const [socket, setSocket] = useState<Socket | null>(null)
    if (socket) {
        // const deleteMessageListener = (messageID) => {
        //     console.log(messageID)
        // }
        socket.removeAllListeners()
        socket.on('message', (message) => {
            console.log(message)
            if (message == 'ir-1') {
                console.log('setPageState...', pageState.labCount)
                if (
                    pageState.labCount - 1 < pageState.totalLab &&
                    pageState.startTime
                ) {
                    if (pageState.totalLab == pageState.labCount) {
                        playWinSound()
                    } else {
                        playTickSound()
                    }
                    setPageState({
                        ...pageState,
                        labCount: pageState.labCount + 1,
                    })
                }
            }
        })
        // socket.on('deleteMessage', deleteMessageListener)
    }
    useEffect(() => {
        console.log('init socket', `:3000`)
        const newSocket = io(`http://192.168.2.243:3000`)
        setSocket(newSocket)
        newSocket.emit('getMessages')
        return () => {
            newSocket.close()
        }
    }, [setSocket])
    return (
        <SimpleLayout title="Home">
            <Row justify="space-around" style={{ textAlign: 'center' }}>
                <Button
                    size="large"
                    onClick={() => {
                        console.log('Play')
                        setPageState({
                            ...pageState,
                            shouldStart: true,
                            labCount: 0,
                            startTime: null,
                            totalLab: 5,
                        })
                    }}
                >
                    Start 5 Lab
                </Button>
                <Button
                    size="large"
                    onClick={() => {
                        console.log('Play')
                        setPageState({
                            ...pageState,
                            shouldStart: true,
                            labCount: 0,
                            startTime: null,
                            totalLab: 20,
                        })
                    }}
                >
                    Start 20 Lab
                </Button>
                <Button
                    size="large"
                    onClick={() => {
                        console.log('Play')
                        setPageState({
                            ...pageState,
                            shouldStart: true,
                            labCount: 0,
                            startTime: null,
                            totalLab: 100,
                        })
                    }}
                >
                    Start 100 Lab
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
                            <h3 style={{ fontSize: '3em' }}>
                                {pageState.labCount - 1 < 0
                                    ? 0
                                    : pageState.labCount - 1}
                                / {pageState.totalLab}
                            </h3>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Col span={4}>
                            <h3> Total Time : </h3>
                        </Col>
                        <Col span={8}>
                            <CountDownLabel {...pageState} />
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
