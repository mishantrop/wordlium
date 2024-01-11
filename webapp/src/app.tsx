/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react'
import { Keyboard } from './components/keyboard/keyboard'
import { WordLine } from './components/wordline/wordline'
import { Game } from './Game'
import { Layout } from './layout/layout/layout'
// import { BrowserRouter as Router } from 'react-router-dom'

// import AppRoutes from './routes/routes'
import { words } from './dict/words-ru-5'
import * as styles from './app.module.css'
import { rand } from './rand'

enum GameStage {
    GAME = 'GAME',
    FINISH = 'FINISH',
}

export default function App() {
    const game = useRef<Game>(new Game())
    const [shouldUpdate, setShouldUpdate] = useState(Math.random())
    const [stage, setStage] = useState(GameStage.GAME)

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

    useEffect(() => {
        const randomWord = words[rand(0, words.length - 1)]
        game.current.newGame(randomWord)
        game.current.updateListener = () => {
            setShouldUpdate(Math.random())
        }
        game.current.finishListener = () => {
            setStage(GameStage.FINISH)

            // @ts-ignore
            if (typeof window.startConfetti === 'function') {
                showConfetti()
                // @ts-ignore
                window.startConfetti()
                setTimeout(() => {
                    // @ts-ignore
                    window.stopConfetti()
                    setTimeout(() => {
                        hideConfetti()
                    }, 3_000)
                }, 3_000)
            }
        }
    }, [])

    const handleClickNewWord = () => {
        const randomWord = words[rand(0, words.length - 1)]
        game.current.newGame(randomWord)
        setStage(GameStage.GAME)
    }

    return (
        <Layout
            keyboard={(
                <>
                    <div className={styles.hug16} />

                    {stage === GameStage.GAME && (
                        <Keyboard
                            language="ru"
                            errorKeys={game.current.getErrorKeys()}
                            nearKeys={game.current.getNearKeys()}
                            okKeys={game.current.getOkKeys()}
                            onBackspace={() => {
                                game.current.handleBackspace()
                            }}
                            onEnter={() => {
                                game.current.handleEnter()
                            }}
                            onLetter={(key: string) => {
                                game.current.handleKeydown(key)
                            }}
                        />
                    )}
                    {stage === GameStage.FINISH && (
                        <button
                            className={styles.buttonPrimary}
                            onClick={handleClickNewWord}
                        >
                            ещё слово
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
        </Layout>
    )

    // return (
    //   <Router>
    //     <div className={styles.wrapper}>
    //       <Header />
    //       <main className={[commonStyles.container, styles.content].join(' ')}>
    //         <AppRoutes />
    //       </main>
    //       <Footer />
    //     </div>
    //   </Router>
    // )
}
