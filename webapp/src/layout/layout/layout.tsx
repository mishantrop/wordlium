import React from 'react'

import { Footer } from '../Footer/footer'

import Header from '../Header/header'

import * as styles from './layout.module.css'

export const Layout = ({
    children,
    keyboard,
}: {
    children: React.ReactNode;
    keyboard: React.ReactNode;
}) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.main}>
                <div className={[styles.container, styles.mainContent].join(' ')}>
                    {children}
                </div>
                <div className={[styles.container, styles.mainContent].join(' ')}>
                    {keyboard}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
