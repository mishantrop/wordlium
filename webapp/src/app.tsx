import React, { useEffect, useRef, useState } from 'react'
import { Keyboard } from './components/keyboard/keyboard'
import { Letter } from './types/letter'
import { Word } from './components/word/word'
// import { BrowserRouter as Router } from 'react-router-dom'

// import Header from './layout/Header/header'
// import Footer from './layout/Footer/footer'
// import AppRoutes from './routes/routes'
// import * as commonStyles from './assets/styles/common.module.css'
// import * as styles from './app.module.css'

class Game {
  public updateListener = () => {}
  private roundState = {
    currentRoundIdx: 0,
    currentLetterIdx: 0,
  }

  private defaultLetter: Letter = {
    key: '',
    state: undefined,
  }

  public rounds: Array<Array<Letter>> = [
    [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
    [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
  ]

  public suggestLetter = (key: string) => {
    const word = this.rounds[this.roundState.currentRoundIdx].map((letter) => letter.key).join('')

    this.rounds[this.roundState.currentRoundIdx][this.roundState.currentLetterIdx].key = key

    if (this.roundState.currentLetterIdx === 4) {
      // Ввели последнюю букву
      if (this.roundState.currentRoundIdx === this.rounds.length - 1) {
        // Ввели последнее слово
        console.log('GAME OVER')
      } else {
        this.roundState.currentRoundIdx += 1
        this.roundState.currentLetterIdx = 0
      }
    } else {
      this.roundState.currentLetterIdx = word.length + 1
    }

    this.updateListener()
  }
}

export default function App() {
  const game = useRef<Game>(new Game())
  const [shouldUpdate, setShouldUpdate] = useState(Math.random())

  useEffect(() => {
    game.current.updateListener = () => {
      setShouldUpdate(Math.random())
    }
  }, [])

  return (
    <div style={{ maxWidth: '414px', margin: '0 auto' }}>
      <div data-crutch={shouldUpdate} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {game.current.rounds.map((round, roundIdx) => {
          return (
            <Word
              key={roundIdx}
              letters={round}
            />
          )
        })}
      </div>

      <div style={{ height: '16px' }} />

      <Keyboard
        onBackspace={() => {

        }}
        onEnter={() => {

        }}
        onLetter={(key: string) => {
          game.current.suggestLetter(key)
        }}
      />
    </div>
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
