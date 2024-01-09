import React from 'react'

import * as styles from './header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                Wordlium
            </div>
        </header>
    )
}

export default Header
