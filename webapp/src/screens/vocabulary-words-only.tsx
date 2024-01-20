import React from 'react'

import { Modal } from '../components/modal/modal'
import { Layout } from '../layout/layout/layout'
import Header from '../layout/Header/header'
import * as styles from '../app.module.css'

export const ScreenVocabularyWordsOnly = ({
    onClose,
}: {
    onClose: () => void;
}) => {
    return (
        <Layout
            header={(<Header/>)}
        >
            <Modal
                onClose={onClose}
            >
                <div className={styles.typography}>
                    Разрешено вводить только существующие слова, а я такого слова не знаю
                </div>
            </Modal>
        </Layout>
    )
}
