import React from 'react'

import * as styles from './footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>quasi-art.ru 2024</div>
            </div>
        </footer>
    )
}
