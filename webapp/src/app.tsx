/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react'
import { Keyboard } from './components/keyboard/keyboard'
import { WordLine } from './components/wordline/wordline'
import { Game, GameLanguage } from './Game'
import { Layout } from './layout/layout/layout'
// import { BrowserRouter as Router } from 'react-router-dom'

// import AppRoutes from './routes/routes'
import { words as wordsRu } from './dict/words-ru-5'
import { words as wordsEn } from './dict/words-en-5'
import * as styles from './app.module.css'
import { rand } from './rand'
import { Modal } from './components/modal/modal'
import Header from './layout/Header/header'
import { Letter } from './components/wordline/letter'

enum GameStage {
    GAME = 'GAME',
    FINISH = 'FINISH',
}

export default function App() {
    const [cheatX, setCheatX] = useState(0)
    const game = useRef<Game>(new Game())
    const [shouldUpdate, setShouldUpdate] = useState(Math.random())
    const [stage, setStage] = useState(GameStage.GAME)
    const [isOpenHelp, setIsOpenHelp] = useState(false)
    const [isOpenLanguages, setIsOpenLanguages] = useState(false)
    const [gameLanguage, setGameLanguage] = useState<GameLanguage>('ru')

    const wordsByLanguage: Record<GameLanguage, Array<string>> = {
        ru: wordsRu,
        en: wordsEn,
    }
    const words = wordsByLanguage[gameLanguage]

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
        game.current.successListener = () => {
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
        game.current.failListener = () => {
            setStage(GameStage.FINISH)
        }
    }, [gameLanguage])

    const handleClickNewWord = () => {
        const randomWord = words[rand(0, words.length - 1)]
        game.current.newGame(randomWord)
        setStage(GameStage.GAME)
    }

    if (isOpenHelp) {
        return (
            <Layout
                keyboard={null}
                header={(<Header/>)}
            >
                <Modal
                    title="Как играть?"
                    onClose={() => {
                        setIsOpenHelp(false)
                    }}
                >
                    <div className={styles.typography}>
                        <p>Задача: угадать загаданное слово с шести попыток.</p>
                        <p>После каждой попытки буквы в квадратиках и на клавиатуре подсвечиваются определённым образом, чтобы было чуть проще.
                            Например, загадано слово КЛОУН, и вы вводите слово НЮАНС:</p>
                        <div style={{ display: 'flex', gap: '8px', margin: '0 0 1rem' }}>
                            <Letter char="н" mode="near" />
                            <Letter char="ю" />
                            <Letter char="а" />
                            <Letter char="н" mode="near" />
                            <Letter char="с" />
                        </div>
                        <p>Буква Н есть в загаданном слове, но стоит в другом месте.</p>
                        <p>Затем ввели слово БЛОХА. Буквы Л и О есть в загаданном слове и стоят на правильных местах.</p>
                        <div style={{ display: 'flex', gap: '8px', margin: '0 0 1rem' }}>
                            <Letter char="б" />
                            <Letter char="л" mode="ok" />
                            <Letter char="о" mode="ok" />
                            <Letter char="х" />
                            <Letter char="а" />
                        </div>
                        <p>Если слово угадано правильно, то все буквы будут выделены.</p>
                        <div style={{ display: 'flex', gap: '8px', margin: '0 0 1rem' }}>
                            <Letter char="к" mode="ok" />
                            <Letter char="л" mode="ok" />
                            <Letter char="о" mode="ok" />
                            <Letter char="у" mode="ok" />
                            <Letter char="н" mode="ok" />
                        </div>

                        <p><b>Какие слова загаданы?</b></p>
                        <p>Загаданы существительные в единственном числе</p>

                        <p><b>Могут ли в загаданном слове быть одинаковые буквы, например, ВАННА?</b></p>
                        <p>Да, в загаданном слове могут быть одинаковые буквы</p>

                        <p><b>Считаются ли Е и Ё одной буквой?</b></p>
                        <p>Нет, Е и Ё &mdash; это разные буквы</p>
                    </div>
                </Modal>
            </Layout>
        )
    }

    const handleChooseLanguage = (language: GameLanguage) => {
        if (language !== gameLanguage) {
            setGameLanguage(language)
        }

        setIsOpenLanguages(false)
    }

    if (isOpenLanguages) {
        return (
            <Layout
                keyboard={null}
                header={(<Header/>)}
            >
                <Modal
                    title="Выберите язык"
                    onClose={() => {
                        setIsOpenLanguages(false)
                    }}
                >
                    <div className={styles.typography}>
                        <button
                            className={styles.buttonPrimary}
                            onClick={() => {
                                handleChooseLanguage('ru')
                            }}
                        >
                            Русский
                        </button>
                        <button
                            className={styles.buttonPrimary}
                            onClick={() => {
                                handleChooseLanguage('en')
                            }}
                        >
                            English
                        </button>
                    </div>
                </Modal>
            </Layout>
        )
    }

    return (
        <Layout
            header={(
                <Header
                    onClickHelp={() => {
                        setIsOpenHelp(true)
                    }}
                    onClickLanguage={() => {
                        setIsOpenLanguages(true)
                    }}
                />
            )}
            keyboard={(
                <>
                    <div className={styles.hug16} />

                    {stage === GameStage.GAME && (
                        <Keyboard
                            language={gameLanguage}
                            errorKeys={game.current.getErrorKeys()}
                            nearKeys={game.current.getNearKeys()}
                            okKeys={game.current.getOkKeys()}
                            onBackspace={() => {
                                setCheatX((x) => x + 1)
                                game.current.handleBackspace()
                            }}
                            onEnter={() => {
                                game.current.handleEnter()
                                setCheatX(0)
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

            {cheatX > 20 && game.current.letterToString(game.current.targetWord)}
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
