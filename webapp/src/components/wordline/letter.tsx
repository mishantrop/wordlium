import React from 'react'

import { StateLetterStatus } from '../../Game'

import * as styles from './letter.module.css'

type Props = {
    char: string;
    isCurrent?: boolean;
    mode?: StateLetterStatus;
}

export const Letter = ({
    char,
    isCurrent,
    mode,
}: Props) => (
    <div
        className={[
            styles.letter,
            // Буква отгадана
            mode === 'ok' ? styles.ok : undefined,
            // Буква отгадана, но место неправильное
            mode === 'near' ? styles.near : undefined,
            // Пустая ячейка для текущего ввода
            isCurrent ? styles.current : undefined,
        ].join(' ')}
    >
        {char}
    </div>
)