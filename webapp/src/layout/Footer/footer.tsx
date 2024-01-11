import React from 'react'

import * as styles from './footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
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
