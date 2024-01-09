import type { Letter, Word } from './types/letter'

export class Game {
    public roundState: {
        currentLetterIdx: number;
        currentRoundIdx: number;

        nearKeys: Array<string>;
        okKeys: Array<string>;
        usedKeys: Array<string>;
    } = {
            currentLetterIdx: 0,
            currentRoundIdx: 0,

            nearKeys: [],
            okKeys: [],
            usedKeys: [],
        }

    private defaultLetter: Letter = {
        key: '',
        state: undefined,
    }
    private targetWord: Word = []

    private stringToLetter = (value: string): Array<Letter> => {
        return value.split('').map((char) => ({ key: char }))
    }

    // private letterToString = (letters: Array<Letter>): string => {
    //     return letters.map((letter) => letter.key).join('')
    // }

    public getLetter = () => {
        return this.targetWord
    }

    public updateListener = () => {}

    public rounds: Array<Array<Letter>> = [
        [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
        [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
        [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
        [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
        [{ ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }, { ...this.defaultLetter }],
    ]

    public enterKey = (key: string) => {
        const lastLetterIdx = this.rounds[0].length - 1
        const lastLineIdx = this.rounds.length - 1
        const wordRaw = this.rounds[this.roundState.currentRoundIdx]
        const wordString = wordRaw.map((letter) => letter.key).join('')

        wordRaw[this.roundState.currentLetterIdx].key = key

        if (this.roundState.currentLetterIdx === lastLetterIdx) {
            // Ввели последнюю букву
            if (this.roundState.currentRoundIdx === lastLineIdx) {
                // Ввели последнее слово
                console.log('GAME OVER')
            } else {
                // Взять буквы из только что законченного слова и занести их в массивы (used, okPlace, wrongPlace)
                wordRaw.forEach((letter, letterIdx) => {
                    const isPlaceOk = this.targetWord[letterIdx].key === letter.key
                    // TODO const isPlaceWrong =
                    /**
                     * абабв -цель
                     * абааг - ввели
                     * ok ok ok near used
                     */
                    if (isPlaceOk) {
                        this.roundState.okKeys.push(letter.key)
                    } else {
                        this.roundState.usedKeys.push(letter.key)
                    }
                })

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

    public setTargetWord = (value: string) => {
        this.targetWord = this.stringToLetter(value)
    }
}
