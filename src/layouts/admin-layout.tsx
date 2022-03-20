import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout } from 'antd'
import AdminHeader from './_admin-header'
import AdminSider from './_admin-sider'
import { Content, Footer } from 'antd/lib/layout/layout'
type Props = {
    title: string
    children?: JSX.Element | JSX.Element[]
}
const AdminLayout: React.FC<Props> = (props: Props) => {
    const [showChild, setShowChild] = useState(false)

    // Wait until after client-side hydration to show
    useEffect(() => {
        setTimeout(() => {
            setShowChild(true)
        }, 1000)
    }, [])
    if (!showChild) {
        // You can show some kind of placeholder UI here
        return <div>Loading</div>
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminHeader></AdminHeader>
            <Layout>
                <AdminSider></AdminSider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}

                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
