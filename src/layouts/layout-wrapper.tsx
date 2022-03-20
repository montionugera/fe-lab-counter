import React from 'react'
import DefaultLayout from './default-layout'
// import AdminLayout from './admin-layout';
import AuxProps from './layout-props'

// const layouts = {
//   default: DefaultLayout,
//   admin: AdminLayout,
// };

const LayoutWrapper = (props: AuxProps) => {
    // to get the text value of the assigned layout of each component
    // ((props.children as ReactElement).type as JSXElementConstructor<any>).layout
    // const Layout = layouts[.layout];
    // // if we have a registered layout render children with said layout
    // if (Layout != null) {
    //   return <Layout {...props}>{props.children}</Layout>;
    // }
    // if not render children with fragment
    return <DefaultLayout {...props}>{props.children}</DefaultLayout>
}

export default LayoutWrapper
