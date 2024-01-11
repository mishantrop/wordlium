import type { Letter, Word } from './types/letter'

type StateLetterStatus = 'ok' | 'near' | 'error'

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

    private defaultLetter: Letter = {
        key: '',
        state: undefined,
    }
    private targetWord: Word = []

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

    public stringToLetter = (value: string): Array<Letter> => {
        return value.split('').map((char) => ({ key: char }))
    }

    public letterToString = (letters: Array<Letter>): string => {
        return letters.map((letter) => letter.key).join('')
    }

    public getWordLetter = () => {
        return this.targetWord
    }

    public getWordString = () => {
        return this.letterToString(this.targetWord)
    }

    private getInitialAttempts = (): Array<Array<Letter>> => {
        return [
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
        ]
    }

    public updateListener = () => {}
    public finishListener = () => {}

    public attempts: Array<Array<Letter>> = this.getInitialAttempts()

    public enterKey = (enteredKey: string) => {
        const lastLetterIdx = this.attempts[0].length - 1
        const lastLineIdx = this.attempts.length - 1
        const currentAttempt = this.attempts[this.state.currentRoundIdx]
        currentAttempt[this.state.currentLetterIdx].key = enteredKey
        const currentAttemptString = currentAttempt.map((letter) => letter.key).join('')

        if (this.state.currentLetterIdx === lastLetterIdx) { // Ввели последнюю букву
            if (this.letterToString(this.targetWord) === currentAttemptString) { // Ввели слово правильно
                this.finishListener()
            } else if (this.state.currentRoundIdx === lastLineIdx) { // Ввели последнюю букву последнего раунда
                this.finishListener()
            } else {
                // Object.keys(this.state.enteredLetters).forEach((stateLetter) => {
                //     if (this.state.enteredLetters[stateLetter] === 'ok') {

                //     } else if (this.state.enteredLetters[stateLetter] === 'near') {

                //     } else if (this.state.enteredLetters[stateLetter] === 'error') {

                //     } else {

                //     }

                //     // this.state.enteredLetters[stateLetter] = undefined
                // })

                // Взять буквы из только что законченного слова и занести их в массивы (used, okPlace, wrongPlace)
                currentAttempt.forEach((letter, letterIdx) => {
                    const isPlaceOk = this.targetWord[letterIdx].key === letter.key
                    if (isPlaceOk) {
                        this.state.enteredLetters[letter.key] = 'ok'
                    } else if (currentAttemptString.includes(letter.key)) {
                        this.state.enteredLetters[letter.key] = 'near'
                    }
                })

                // Переход к следующему слову
                this.state.currentRoundIdx += 1
                this.state.currentLetterIdx = 0
            }
        } else {
            // Переход к следующей букве
            this.state.currentLetterIdx = currentAttemptString.length + 1
        }

        this.updateListener()
    }

    public handleBackspace = () => {
        this.attempts[this.state.currentRoundIdx][this.state.currentLetterIdx].key = ''
        if (this.state.currentLetterIdx > 0) {
            this.state.currentLetterIdx -= 1
        }
        this.updateListener()
    }

    private setTargetWord = (value: string) => {
        this.targetWord = this.stringToLetter(value)
    }

    public newGame = (value: string) => {
        this.setTargetWord(value)

        this.attempts = this.getInitialAttempts()

        this.state = {
            currentLetterIdx: 0,
            currentRoundIdx: 0,
            enteredLetters: {},
        }
    }
}
