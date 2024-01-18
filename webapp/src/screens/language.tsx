import React from 'react'

import { Modal } from '../components/modal/modal'
import { Layout } from '../layout/layout/layout'
import Header from '../layout/Header/header'
import * as styles from '../app.module.css'
import { GameLanguage } from '../game/Game'

export const ScreenLanguage = ({
    currentLanguage,
    onChooseLanguage,
    onClose,
}: {
    currentLanguage: GameLanguage;
    onChooseLanguage: (language: GameLanguage) => void;
    onClose: () => void;
}) => {
    const languages: Array<{ code: GameLanguage; title: string; }> = [
        { code: 'ru', title: 'Русский' },
        { code: 'en', title: 'English' },
    ]

    return (
        <Layout
            header={(<Header/>)}
        >
            <Modal
                {...currentLanguage === 'ru' ? { title: 'Выберите язык' } : {}}
                {...currentLanguage === 'en' ? { title: 'Select language' } : {}}
                onClose={onClose}
            >
                <div className={styles.typography}>
                    {languages.map((language) => (
                        <>
                            <button
                                className={styles.buttonPrimary}
                                key={language.code}
                                onClick={() => {
                                    if (currentLanguage !== language.code) {
                                        onChooseLanguage(language.code)
                                    }
                                    onClose()
                                }}
                            >
                                {language.title}
                            </button>
                            <div style={{ height: '8px' }} />
                        </>
                    ))}
                </div>
            </Modal>
        </Layout>
    )
}
