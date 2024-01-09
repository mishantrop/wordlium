import React, { useEffect, useRef, useState } from 'react'
import { Keyboard } from './components/keyboard/keyboard'
import { WordLine } from './components/wordline/wordline'
import { Game } from './Game'
import { Layout } from './layout/layout/layout'
// import { BrowserRouter as Router } from 'react-router-dom'

// import AppRoutes from './routes/routes'
// import * as commonStyles from './assets/styles/common.module.css'
import styles from './app.module.css'

export default function App() {
    const game = useRef<Game>(new Game())
    const [shouldUpdate, setShouldUpdate] = useState(Math.random())

    useEffect(() => {
        game.current.setTargetWord('водка')
        game.current.updateListener = () => {
            setShouldUpdate(Math.random())
        }
    }, [])

    return (
        <Layout>
            <div data-crutch={shouldUpdate} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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

            <div style={{ height: '16px' }} />

            <Keyboard
                language="ru"
                usedKeys={game.current.roundState.usedKeys}
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
