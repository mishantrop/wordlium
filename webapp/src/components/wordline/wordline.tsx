import React from 'react'

import { Letter as LetterType } from '../../types/letter'

import { Letter } from './letter'
import * as styles from './wordline.module.css'

type Props = {
    attempt: Array<LetterType>;
    currentLetterIdx?: number;
    targetWord?: Array<LetterType>;
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
                        isCurrent={letterIdx === currentLetterIdx}
                        {...targetWord?.[letterIdx] && attempt[letterIdx].key === targetWord[letterIdx].key ? { mode: 'ok' } : {}}
                        {...targetWord?.[letterIdx] && attempt[letterIdx].key && attempt[letterIdx].key !== targetWord[letterIdx].key && targetWordString?.includes(attempt[letterIdx].key) ? { mode: 'near' } : {}}
                    />
                )
            })}
        </div>
    )
}
