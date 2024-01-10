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

    return (
        <Layout>
            <div data-crutch={shouldUpdate} />

            <div className={styles.words}>
                {game.current.rounds.map((round, roundIdx) => {
                    const isCurrentRound = roundIdx === game.current.roundState.currentRoundIdx
                    return (
                        <WordLine
                            {...!isCurrentRound ? { targetWord: game.current.getLetter() } : {}}
                            key={roundIdx}
                            letters={round}
                            currentLetterIdx={isCurrentRound ? game.current.roundState.currentLetterIdx : undefined}
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
                    errorKeys={game.current.roundState.usedKeys}
                    wrongPlaceKeys={game.current.roundState.usedKeys}
                    okKeys={game.current.roundState.okKeys}
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
                <button onClick={handleClickNewWord}>
                    Ещё слово
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
