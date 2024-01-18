import { WordLetter, Word } from '../../types/letter'
import { words as wordsRu } from '../dict/words-ru-5'
import { words as wordsEn } from '../dict/words-en-5'

import { rand } from './rand'

export type StateLetterStatus = 'ok' | 'near' | 'error'
export type GameLanguage = 'ru' | 'en'

export type Config = {
    vocabulary_words_only: boolean;
    language: GameLanguage;
}

export class Game {
    public state: {
        currentLetterIdx: number;
        currentRoundIdx: number;
        enteredLetters: Record<string, StateLetterStatus | undefined>;
    } = {
            currentLetterIdx: 0,
            currentRoundIdx: 0,
            enteredLetters: {},
        }

    private defaultLetter: WordLetter = {
        key: '',
        state: undefined,
    }
    public targetWord: Word = []
    private wordsByLanguage: Record<GameLanguage, Array<string>> = {
        ru: wordsRu,
        en: wordsEn,
    }
    private config: Config = {
        vocabulary_words_only: true,
        language: 'ru',
    }

    constructor() {
        this.config.vocabulary_words_only = this.getLocalStorageBooleanValue('vocabulary_words_only', true)
        this.config.language = this.getLocalStorageStringValue('language', 'ru') as GameLanguage
        if (this.config.language !== 'ru' && this.config.language !== 'en') {
            this.config.language = 'ru'
            localStorage.removeItem('language')
        }
    }

    private getLocalStorageBooleanValue = (name: keyof Config, defaultValue: boolean) => {
        const value = localStorage.getItem(`config.${name}`)
        if (value === 'true' || value === 'false') {
            return value === 'true'
        }
        return defaultValue
    }

    private getLocalStorageStringValue = (name: keyof Config, defaultValue?: string) => {
        const value = localStorage.getItem(`config.${name}`)
        return value ?? defaultValue
    }

    public updateListener = () => {}
    public successListener = () => {}
    public failListener = () => {}
    public publicErrorListener: (options: { text: string; }) => void = () => {}

    public getErrorKeys = (): Array<string> => {
        return this.getSomeKeys('error')
    }

    public getNearKeys = (): Array<string> => {
        return this.getSomeKeys('near')
    }

    public getOkKeys = (): Array<string> => {
        return this.getSomeKeys('ok')
    }

    private getSomeKeys = (status: StateLetterStatus): Array<string> => {
        const result: Array<string> = []

        Object.keys(this.state.enteredLetters).forEach((key) => {
            if (this.state.enteredLetters[key] === status) {
                result.push(key)
            }
        })

        return result
    }

    public stringToLetter = (value: string): Word => {
        return value.split('').map((char) => ({ key: char, state: undefined }))
    }

    public letterToString = (letters: Word): string => {
        return letters.map((letter) => letter.key).join('')
    }

    public getWordLetter = () => {
        return this.targetWord
    }

    public getWordString = () => {
        return this.letterToString(this.targetWord)
    }

    private getInitialAttempts = (): Array<Word> => {
        return [
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
        ]
    }

    private updateLettersState = (currentAttempt: Word) => {
        const targetWrongString = this.letterToString(this.targetWord)
        // Взять буквы из только что законченного слова и занести их в массивы (used, okPlace, wrongPlace)
        currentAttempt.forEach((letter, letterIdx) => {
            if (this.targetWord[letterIdx].key === letter.key) {
                this.state.enteredLetters[letter.key] = 'ok'
                currentAttempt[letterIdx].state = 'ok'
            } else if (letter.key && targetWrongString.includes(letter.key) && this.state.enteredLetters[letter.key] !== 'ok') {
                this.state.enteredLetters[letter.key] = 'near'
                currentAttempt[letterIdx].state = 'near'
            } else if (!targetWrongString.includes(letter.key)) {
                this.state.enteredLetters[letter.key] = 'error'
                currentAttempt[letterIdx].state = 'error'
            }
        })
    }

    public handleKeydown = (enteredKey: string) => {
        const currentLetter = this.attempts[this.state.currentRoundIdx][this.state.currentLetterIdx]

        if (!currentLetter) {
            return
        }

        currentLetter.key = enteredKey

        if (this.state.currentLetterIdx < this.targetWord.length) {
            this.state.currentLetterIdx = this.state.currentLetterIdx + 1
        }

        this.updateListener()
    }

    public handleBackspace = () => {
        const lastLetterIdx = this.targetWord.length - 1
        const currentLetter = this.attempts[this.state.currentRoundIdx][this.state.currentLetterIdx]
        const prevLetter = this.attempts[this.state.currentRoundIdx][this.state.currentLetterIdx - 1]

        if (!currentLetter && this.state.currentLetterIdx > lastLetterIdx) {
            // Слово введено полностью
            prevLetter.key = ''
            this.state.currentLetterIdx -= 1
        } else if (currentLetter && !currentLetter.key && this.state.currentLetterIdx === lastLetterIdx) {
            this.state.currentLetterIdx -= 1
            prevLetter.key = ''
        } else if (currentLetter && this.state.currentLetterIdx > 0) {
            prevLetter.key = ''
            this.state.currentLetterIdx -= 1
        }
        this.updateListener()
    }

    public handleEnter = () => {
        const lastLetterIdx = this.targetWord.length - 1
        const lastLineIdx = this.attempts.length - 1
        const currentAttempt = this.attempts[this.state.currentRoundIdx]
        const currentAttemptString = this.letterToString(currentAttempt)

        if (this.config.vocabulary_words_only) {
            const words = this.wordsByLanguage[this.config.language]
            if (!words.includes(currentAttemptString)) {
                if (typeof this.publicErrorListener === 'function') {
                    this.publicErrorListener({ text: 'Слово не найдено в словаре' })
                }
                return
            }
        }

        if (this.state.currentLetterIdx === lastLetterIdx + 1) {
            if (this.letterToString(this.targetWord) === currentAttemptString) { // Ввели слово правильно
                this.updateLettersState(currentAttempt)
                this.successListener()
            } else if (this.state.currentRoundIdx === lastLineIdx) { // Ввели последнюю букву последнего раунда
                this.failListener()
            } else {
                this.updateLettersState(currentAttempt)

                // Переход к следующему слову
                this.state.currentRoundIdx += 1
                this.state.currentLetterIdx = 0
            }
        }

        this.updateListener()
    }

    private setTargetWord = (value: string) => {
        this.targetWord = this.stringToLetter(value)
    }

    public newGame = () => {
        const words = this.wordsByLanguage[this.config.language]
        const randomWord = words[rand(0, words.length - 1)]

        console.log({ randomWord })

        this.setTargetWord(randomWord)

        this.attempts = this.getInitialAttempts()
        this.state = {
            currentLetterIdx: 0,
            currentRoundIdx: 0,
            enteredLetters: {},
        }

        this.updateListener()
    }

    public getConfigProperty = (propertyName: keyof Config) => {
        return this.config[propertyName]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public setConfigProperty = (propertyName: keyof Config, value: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.config[propertyName] = value
        this.updateListener()

        localStorage.setItem(`config.${propertyName}`, value)
    }

    public attempts: Array<Word> = this.getInitialAttempts()
}
