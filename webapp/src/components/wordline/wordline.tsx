import React from 'react'

import { Word } from '../../../types/letter'

import { Letter } from './letter'
import * as styles from './wordline.module.css'

type Props = {
    attempt: Word;
    currentLetterIdx?: number;
    targetWord?: Word;
    targetWordString?: string;
}

export const WordLine = ({
    attempt,
    currentLetterIdx,
    targetWord,
    targetWordString,
}: Props) => {
    return (
        <div className={styles.wordline}>
            {attempt.map((_, letterIdx) => {
                return (
                    <Letter
                        key={letterIdx}
                        char={attempt[letterIdx].key}
                        isCurrent={letterIdx === currentLetterIdx || (letterIdx === 4 && currentLetterIdx === 5)}
                        {...targetWord?.[letterIdx] && attempt[letterIdx].key === targetWord[letterIdx].key ? { mode: 'ok' } : {}}
                        {...targetWord?.[letterIdx] && attempt[letterIdx].key && attempt[letterIdx].key !== targetWord[letterIdx].key && targetWordString?.includes(attempt[letterIdx].key) ? { mode: 'near' } : {}}
                    />
                )
            })}
        </div>
    )
}
