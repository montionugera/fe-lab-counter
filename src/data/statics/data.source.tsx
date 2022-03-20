import React from 'react'
export const Nav30DataSource = {
    wrapper: { className: 'header3 home-page-wrapper' },
    page: { className: 'home-page' },
    logo: {
        className: 'header3-logo',
        children: '/static/joy-con-logo.png',
    },
    Menu: {
        className: 'header3-menu',
        children: [
            {
                name: 'item0',
                className: 'header3-item',
                children: {
                    href: '/',
                    children: [
                        {
                            children: (
                                <span>
                                    <p>Home</p>
                                </span>
                            ),
                            name: 'text',
                        },
                    ],
                },
                // subItem: [
                //   {
                //     name: 'sub0',
                //     className: 'item-sub',
                //     children: {
                //       className: 'item-sub-item',
                //       children: [
                //         {
                //           name: 'image0',
                //           className: 'item-image',
                //           children:
                //             'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg',
                //         },
                //         {
                //           name: 'title',
                //           className: 'item-title',
                //           children: 'Ant Design',
                //         },
                //         {
                //           name: 'content',
                //           className: 'item-content',
                //           children: '企业级 UI 设计体系',
                //         },
                //       ],
                //     },
                //   },
                //   {
                //     name: 'sub1',
                //     className: 'item-sub',
                //     children: {
                //       className: 'item-sub-item',
                //       children: [
                //         {
                //           name: 'image0',
                //           className: 'item-image',
                //           children:
                //             'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg',
                //         },
                //         {
                //           name: 'title',
                //           className: 'item-title',
                //           children: 'Ant Design',
                //         },
                //         {
                //           name: 'content',
                //           className: 'item-content',
                //           children: '企业级 UI 设计体系',
                //         },
                //       ],
                //     },
                //   },
                // ],
            },
            {
                name: 'privacy',
                className: 'header3-item',
                children: {
                    href: '/misc/privacy',
                    children: [{ children: 'Privacy Policy', name: 'text' }],
                },
            },
            {
                name: 'terms',
                className: 'header3-item',
                children: {
                    href: '/misc/terms',
                    children: [{ children: 'Terms & Condition', name: 'text' }],
                },
            },
        ],
    },
    mobileMenu: { className: 'header3-mobile-menu' },
}
export const Content110DataSource = {
    OverPack: {
        className: 'home-page-wrapper content11-wrapper',
        playScale: 0.3,
    },
    titleWrapper: {
        className: 'title-wrapper',
        children: [
            {
                name: 'image',
                children:
                    'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
                className: 'title-image',
            },
            { name: 'title', children: 'Sign in', className: 'title-h1' },
            {
                name: 'content',
                children: 'Sign in accross joymify platform',
                className: 'title-content',
            },
            {
                name: 'content2',
                children: '',
                className: 'title-content',
            },
        ],
    },
    button: {
        className: '',
        children: {
            a: { className: 'button', href: '#', children: '立即报名' },
        },
    },
}
export const Footer00DataSource = {
    wrapper: { className: 'home-page-wrapper footer0-wrapper' },
    OverPack: { className: 'home-page footer0', playScale: 0.05 },
    copyright: {
        className: 'copyright',
        children: (
            <span>
                <span>
                    <span>
                        <span>
                            ©2020&nbsp;
                            <a href="https://www.joymify.com">Joymify</a>&nbsp;
                        </span>
                        <span className="allright-reserved">
                            All Rights Reserved
                        </span>
                    </span>
                </span>
            </span>
        ),
    },
}
