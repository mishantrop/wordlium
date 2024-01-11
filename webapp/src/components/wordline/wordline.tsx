import React, { useEffect } from 'react'

import { Letter } from '../../types/letter'

import * as styles from './wordline.module.css'

type Props = {
    currentLetterIdx?: number;
    attempt: Array<Letter>;
    targetWord?: Array<Letter>;
    targetWordString?: string;
}

export const WordLine = ({
    currentLetterIdx,
    attempt,
    targetWord,
    targetWordString,
}: Props) => {
    return (
        <div>
            {targetWordString}:{attempt.map(a=>a.key).join('')}
            <div className={styles.wordline}>
                {attempt.map((_, letterIdx) => {
                    return (
                        <div
                            className={[
                                styles.letter,
                                // Буква отгадана
                                targetWord?.[letterIdx] && attempt[letterIdx].key === targetWord[letterIdx].key
                                    ? styles.ok
                                    : undefined,
                                // Буква отгадана, но место неправильное
                                targetWord?.[letterIdx] && attempt[letterIdx].key !== targetWord[letterIdx].key && targetWordString?.includes(attempt[letterIdx].key)
                                    ? styles.near
                                    : undefined,
                                // Пустая ячейка для текущего ввода
                                letterIdx === currentLetterIdx
                                    ? styles.current
                                    : undefined,
                            ].join(' ')}
                            key={letterIdx}
                        >
                            {attempt[letterIdx].key}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
