import React from 'react'

import * as commonStyles from '../layout/layout.module.css'

import * as styles from './header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <div className={commonStyles.container}>
                Wordlium
            </div>
        </header>
    )
}

export default Header
