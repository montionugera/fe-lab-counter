// import { useRouter } from 'next/router'

import React from 'react'
import SimpleLayout from '../../layouts/simple-layout'
import { Content } from 'antd/lib/layout/layout'
import { termsCondElem } from '../../data/statics/terms-cond'

const PrivacyPage = () => {
    return (
        <SimpleLayout title="Home">
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                {termsCondElem}
            </Content>
        </SimpleLayout>
    )
}

export default PrivacyPage
