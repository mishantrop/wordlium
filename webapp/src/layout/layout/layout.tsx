import React from 'react'

import { Footer } from '../Footer/footer'

import * as styles from './layout.module.css'
import Header from '../Header/header'

export const Layout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                {children}
            </div>
            <Footer/>
        </>
    )
}
