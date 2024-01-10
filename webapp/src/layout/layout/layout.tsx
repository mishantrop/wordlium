import React from 'react'

import { Footer } from '../Footer/footer'

import * as commonStyles from '../../assets/styles/common.module.css'
import Header from '../Header/header'

import * as styles from './layout.module.css'

export const Layout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.main}>
                <div className={commonStyles.container}>
                    {children}
                </div>
                <Footer/>
            </div>
        </div>
    )
}
