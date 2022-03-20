/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react'
import { enquireScreen } from 'enquire-js'

import Nav3 from '../components/Nav/Nav3'
import Footer0 from '../components/Nav/Footer0'

import {
    Nav30DataSource,
    Footer00DataSource,
} from '../data/statics/data.source'
import '../styles/less/antMotionStyle.less'

let isMobile: boolean
enquireScreen((b: boolean) => {
    isMobile = b
})
type Props = {
    title: string
    children?: JSX.Element | JSX.Element[]
}
const { location = {} } = typeof window !== 'undefined' ? window : {}
interface States {
    isMobile: boolean
    show: boolean
}
export default class SimpleLayout extends React.Component<Props, States> {
    dom: HTMLDivElement | null
    constructor(props: Props) {
        super(props)
        this.dom = null
        this.state = {
            isMobile,
            show: !location.port,
        }
    }

    componentDidMount() {
        enquireScreen((b: boolean) => {
            this.setState({ isMobile: !!b })
        })
        console.log('location', location)
        if (location.port) {
            setTimeout(() => {
                this.setState({
                    show: true,
                })
            }, 500)
        }
    }

    render() {
        let children: any[] = []
        if (this.state.show) {
            children = [
                <Nav3
                    key="Nav3_0"
                    dataSource={Nav30DataSource}
                    isMobile={this.state.isMobile}
                />,
            ]
            if (this.props.children) {
                // isMobile={this.state.isMobile}
                const containerDiv = (
                    <div className="main-container" key="MainContainer">
                        {this.props.children}
                    </div>
                )
                children.push(containerDiv)
            }
            children = children.concat([
                <Footer0
                    key="Footer0_0"
                    dataSource={Footer00DataSource}
                    isMobile={this.state.isMobile}
                />,
            ])
        }
        return (
            <div
                className="simple-layout-wrapper"
                ref={(d) => {
                    this.dom = d
                }}
            >
                {this.state.show && children}
            </div>
        )
    }
}
