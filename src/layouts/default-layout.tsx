import React from 'react'
import Link from 'next/link'
import AdminHeader from './_admin-header'

const DefaultLayout = (props: any) => (
    <>
        <AdminHeader />
        <div>
            <div className="sidenav">
                <Link href="/">Home</Link>
                <Link href="/contact-us">Contact Us</Link>
            </div>
            <div id="main">{props.children}</div>
        </div>
    </>
)

export default DefaultLayout
