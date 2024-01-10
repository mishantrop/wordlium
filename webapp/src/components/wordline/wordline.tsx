import React from 'react'

import { Letter } from '../../types/letter'

import * as styles from './wordline.module.css'

type Props = {
    currentLetterIdx?: number;
    letters: Array<Letter>;
    targetWord?: Array<Letter>;
}

export const WordLine = ({
    currentLetterIdx,
    letters,
    targetWord,
}: Props) => {
    return (
        <div className={styles.wordline}>
            {letters.map((letter, letterIdx) => {
                return (
                    <div
                        className={[
                            styles.letter,
                            targetWord?.[letterIdx] && letter.key === targetWord[letterIdx].key ? styles.ok : undefined,
                            letterIdx === currentLetterIdx ? styles.current : undefined,
                        ].join(' ')}
                        key={letterIdx}
                    >
                        {letter.key}
                    </div>
                )
            })}
        </div>
    )
}
