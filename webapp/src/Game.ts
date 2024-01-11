import type { Letter, Word } from './types/letter'

export class Game {
    public roundState: {
        currentLetterIdx: number;
        currentRoundIdx: number;
        letters: Record<string, 'ok' | 'near' | 'error' | undefined>;
    } = {
            currentLetterIdx: 0,
            currentRoundIdx: 0,
            letters: {},
        }

    private defaultLetter: Letter = {
        key: '',
        state: undefined,
    }
    private targetWord: Word = []

    public getErrorKeys = (): Array<string> => {
        const result: Array<string> = []

        Object.keys(this.roundState.letters).forEach((key) => {
            if (this.roundState.letters[key] === 'error') {
                result.push(key)
            }
        })

        return result
    }

    public getNearKeys = (): Array<string> => {
        const result: Array<string> = []

        Object.keys(this.roundState.letters).forEach((key) => {
            if (this.roundState.letters[key] === 'near') {
                result.push(key)
            }
        })

        return result

    }

    public getOkKeys = (): Array<string> => {
        const result: Array<string> = []

        Object.keys(this.roundState.letters).forEach((key) => {
            if (this.roundState.letters[key] === 'ok') {
                result.push(key)
            }
        })

        return result

    }

    private stringToLetter = (value: string): Array<Letter> => {
        return value.split('').map((char) => ({ key: char }))
    }

    private letterToString = (letters: Array<Letter>): string => {
        return letters.map((letter) => letter.key).join('')
    }

    public getLetter = () => {
        return this.targetWord
    }

    private getInitialRounds = (): Array<Array<Letter>> => {
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

    public rounds: Array<Array<Letter>> = this.getInitialRounds()

    public enterKey = (key: string) => {
        const lastLetterIdx = this.rounds[0].length - 1
        const lastLineIdx = this.rounds.length - 1
        const wordRaw = this.rounds[this.roundState.currentRoundIdx]
        const wordString = wordRaw.map((letter) => letter.key).join('')

        wordRaw[this.roundState.currentLetterIdx].key = key

        if (this.roundState.currentLetterIdx === lastLetterIdx) {
            // Ввели слово правильно
            if (this.letterToString(this.targetWord) === `${wordString}${key}`) { // TODO костыль
                this.finishListener()
            }
            // Ввели последнюю букву
            else if (this.roundState.currentRoundIdx === lastLineIdx) {
                // Ввели последнее слово
                console.log('GAME OVER')
                this.finishListener()
            } else {
                Object.keys(this.roundState.letters).forEach((stateLetter) => {
                    this.roundState.letters[stateLetter] = undefined
                })

                // Взять буквы из только что законченного слова и занести их в массивы (used, okPlace, wrongPlace)
                // wordRaw.forEach((letter, letterIdx) => {
                //     const isPlaceOk = this.targetWord[letterIdx].key === letter.key
                //     if (isPlaceOk) {
                //         this.roundState.okKeys.push(letter.key)
                //     } else {
                //         this.roundState.usedKeys.push(letter.key)
                //     }
                // })

                // Переход к следующему слову
                this.roundState.currentRoundIdx += 1
                this.roundState.currentLetterIdx = 0
            }
        } else {
            // Переход к следующей букве
            this.roundState.currentLetterIdx = wordString.length + 1
        }

        this.updateListener()
    }

    public handleBackspace = () => {
        this.rounds[this.roundState.currentRoundIdx][this.roundState.currentLetterIdx].key = ''
        if (this.roundState.currentLetterIdx > 0) {
            this.roundState.currentLetterIdx -= 1
        }
    }

    private setTargetWord = (value: string) => {
        this.targetWord = this.stringToLetter(value)
    }

    public newGame = (value: string) => {
        this.setTargetWord(value)

        this.rounds = this.getInitialRounds()

        this.roundState = {
            currentLetterIdx: 0,
            currentRoundIdx: 0,
            letters: {},
        }
    }
}
