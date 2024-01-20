import React, { useEffect, useRef, useState } from 'react'
import { Keyboard } from './components/keyboard/keyboard'
import { WordLine } from './components/wordline/wordline'
import { Game, GameLanguage } from './game/Game'
import { Layout } from './layout/layout/layout'

import * as styles from './app.module.css'
import { Modal } from './components/modal/modal'
import Header from './layout/Header/header'
import { GameStage } from './game/GameStage'
import { ScreenHelp } from './screens/help'
import { ScreenLanguage } from './screens/language'
import { ScreenVocabularyWordsOnly } from './screens/vocabulary-words-only'

export const App = () => {
    const [cheatX, setCheatX] = useState(0)
    const game = useRef<Game>(new Game())
    const [shouldUpdate, setShouldUpdate] = useState(Math.random())
    const [stage, setStage] = useState(GameStage.GAME)

    const [openedModal, setOpenedModal] = useState<'help' | 'settings' | 'language' | 'error'>()

    const showConfetti = () => {
        const confettiElement = document.querySelector<HTMLCanvasElement>('#confetti-canvas')
        if (confettiElement) {
            confettiElement.style.display = 'block'
        }
    }

    const hideConfetti = () => {
        const confettiElement = document.querySelector<HTMLCanvasElement>('#confetti-canvas')
        if (confettiElement) {
            confettiElement.style.display = 'none'
        }
    }

    const newGame = () => {
        setStage(GameStage.GAME)
        game.current.newGame()
    }

    useEffect(() => {
        newGame()
        game.current.updateListener = () => {
            setShouldUpdate(Math.random())
        }
        game.current.publicErrorListener = () => {
            setOpenedModal('error')
        }
        game.current.successListener = () => {
            setStage(GameStage.FINISH)

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (typeof window.startConfetti === 'function') {
                showConfetti()
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.startConfetti()
                setTimeout(() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    window.stopConfetti()
                    setTimeout(() => {
                        hideConfetti()
                    }, 3_000)
                }, 3_000)
            }
        }
        game.current.failListener = () => {
            setStage(GameStage.FINISH)
        }
    }, [])

    const handleClickNewWord = () => {
        game.current.newGame()
        setStage(GameStage.GAME)
    }

    const handleChooseLanguage = (language: GameLanguage) => {
        if (language !== game.current.getConfigProperty('language')) {
            game.current.setConfigProperty('language', language)
            newGame()
        }
    }

    if (openedModal === 'help') {
        return (
            <ScreenHelp
                onClose={() => {
                    setOpenedModal(undefined)
                }}
            />
        )
    }

    if (openedModal === 'language') {
        return (
            <ScreenLanguage
                currentLanguage={game.current.getConfigProperty('language') as GameLanguage}
                onChooseLanguage={handleChooseLanguage}
                onClose={() => {
                    setOpenedModal(undefined)
                }}
            />
        )
    }

    if (openedModal === 'error') {
        return (
            <ScreenVocabularyWordsOnly
                onClose={() => {
                    setOpenedModal(undefined)
                }}
            />
        )
    }

    if (openedModal === 'settings') {
        return (
            <Layout
                header={(<Header/>)}
            >
                <Modal
                    title="Настройки"
                    onClose={() => {
                        setOpenedModal(undefined)
                    }}
                >
                    <label style={{ display: 'flex', gap: '8px', userSelect: 'none' }}>
                        <input
                            checked={game.current.getConfigProperty('vocabulary_words_only') as boolean}
                            name="vocabulary_words_only"
                            type="checkbox"
                            onChange={(event) => {
                                game.current.setConfigProperty('vocabulary_words_only', event.target.checked)
                            }}
                        />
                        Вводить слова только из словаря
                    </label>
                </Modal>
            </Layout>
        )
    }

    return (
        <Layout
            header={(
                <Header
                    onClickHelp={() => {
                        setOpenedModal('help')
                    }}
                    onClickLanguage={() => {
                        setOpenedModal('language')
                    }}
                    onClickSettings={() => {
                        setOpenedModal('settings')
                    }}
                />
            )}
            keyboard={(
                <>
                    <div className={styles.hug16} />

                    {stage === GameStage.GAME && (
                        <Keyboard
                            language={game.current.getConfigProperty('language')}
                            errorKeys={game.current.getErrorKeys()}
                            nearKeys={game.current.getNearKeys()}
                            okKeys={game.current.getOkKeys()}
                            onBackspace={() => {
                                setCheatX((x) => x + 1)
                                game.current.handleBackspace()
                            }}
                            onEnter={() => {
                                setCheatX(0)
                                game.current.handleEnter()
                            }}
                            onLetter={(key: string) => {
                                setCheatX(0)
                                game.current.handleKeydown(key)
                            }}
                        />
                    )}
                    {stage === GameStage.FINISH && (
                        <button
                            className={styles.buttonPrimary}
                            onClick={handleClickNewWord}
                        >
                            {game.current.getConfigProperty('language') === 'en' ? 'new game' : null}
                            {game.current.getConfigProperty('language') === 'ru' ? 'ещё слово' : null}
                        </button>
                    )}
                </>
            )}
        >
            <div data-crutch={shouldUpdate} />
            <div className={styles.words}>
                {game.current.attempts.map((attempt, attemptIdx) => {
                    const isCurrentAttempt = attemptIdx === game.current.state.currentRoundIdx
                    return (
                        <WordLine
                            {...!isCurrentAttempt || stage === GameStage.FINISH
                                ? {
                                    targetWord: game.current.getWordLetter(),
                                    targetWordString: game.current.getWordString(),
                                }
                                : {}
                            }
                            key={attemptIdx}
                            attempt={attempt}
                            currentLetterIdx={
                                isCurrentAttempt && stage === GameStage.GAME
                                    ? game.current.state.currentLetterIdx
                                    : undefined
                            }
                        />
                    )
                })}
            </div>

            {cheatX > 20 && game.current.letterToString(game.current.targetWord)}
        </Layout>
    )
}
