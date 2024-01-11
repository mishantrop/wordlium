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

    useEffect(() => {
        const randomWord = words[rand(0, words.length - 1)]
        console.log({ randomWord })
        game.current.newGame(randomWord)
        game.current.updateListener = () => {
            setShouldUpdate(Math.random())
        }
        game.current.finishListener = () => {
            setStage(GameStage.FINISH)
        }
    }, [])

    const handleClickNewWord = () => {
        const randomWord = words[rand(0, words.length - 1)]
        console.log({ randomWord })
        game.current.newGame(randomWord)
        setStage(GameStage.GAME)
    }

    console.log(game.current.state.enteredLetters)

    return (
        <Layout>
            <div data-crutch={shouldUpdate} />

            <div className={styles.words}>
                {game.current.attempts.map((attempt, attemptIdx) => {
                    const isCurrentAttempt = attemptIdx === game.current.state.currentRoundIdx
                    return (
                        <WordLine
                            {...!isCurrentAttempt
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

            <div className={styles.hug16} />
            <div className={styles.hug16} />
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

                    }}
                    onLetter={(key: string) => {
                        game.current.enterKey(key)
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
