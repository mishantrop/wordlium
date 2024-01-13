import type { Letter, Word } from './types/letter'

export type StateLetterStatus = 'ok' | 'near' | 'error'
export type GameLanguage = 'ru' | 'en'

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
    public targetWord: Word = []

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
        return value.split('').map((char) => ({ key: char, state: undefined }))
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
            [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
        ]
    }

    public updateListener = () => {}
    public successListener = () => {}
    public failListener = () => {}

    public attempts: Array<Array<Letter>> = this.getInitialAttempts()

    private updateLettersState = (currentAttempt: Letter[]) => {
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

    public newGame = (value: string) => {
        this.setTargetWord(value)

        console.log(`target: ${value}`)

        this.attempts = this.getInitialAttempts()
        this.state = {
            currentLetterIdx: 0,
            currentRoundIdx: 0,
            enteredLetters: {},
        }

        this.updateListener()
    }
}
