import React from 'react'

import * as commonStyles from '../layout/layout.module.css'

import * as styles from './footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={commonStyles.container}>
                <div className={styles.copyright}>
                    <a
                        href="https://quasi-art.ru"
                        target="_blank"
                        rel="noreferrer"
                    >
                        quasi-art.ru
                    </a> 2024
                </div>
            </div>
        </footer>
    )
}
