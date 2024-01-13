import React from 'react'

import { Footer } from '../Footer/footer'

import * as styles from './layout.module.css'

export const Layout = ({
    children,
    header,
    keyboard,
}: {
    children: React.ReactNode;
    header: React.ReactNode;
    keyboard: React.ReactNode;
}) => {
    return (
        <div className={styles.layout}>
            {header}
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
